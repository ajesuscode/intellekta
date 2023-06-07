import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ChatMessageHistory } from "langchain/memory";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { LLMChain } from "langchain/chains";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        //getting request from a client page
        const body = await req.json();
        console.log(body);
        //init a query to use in search and LLM
        const query = body.query;
        //defining a LLM
        const model = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-3.5-turbo",
            temperature: 0,
            maxTokens: 1000,
        });

        //query search function utilizing serper.dev
        async function getSearchResult() {
            let data = JSON.stringify({
                q: body.query,
            });
            let config = {
                method: "post",
                url: "https://google.serper.dev/search",
                headers: {
                    "X-API-KEY": "72c4402a87d287368aeb1b0210575ab0b1e76404",
                    "Content-Type": "application/json",
                },
                data: data,
            };
            //reciving a response
            const response = await axios(config)
                .then((res) => {
                    console.log("extracted");
                    return res.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            //we need to make a response as a string to use it in Langchain
            return JSON.stringify(response);
        }
        //calling intilized function
        const response = await getSearchResult();

        //defining template with Langchain
        const template =
            "Extract urls into a list from {response}. Above is a search result for a {query}";
        //defining prompt Template with variables. We have response from above function call and query from client
        const promptTemplate = new PromptTemplate({
            template: template,
            inputVariables: ["response", "query"],
        });
        //defining chain to use our PromptTemplate
        const chain = new LLMChain({
            llm: model,
            prompt: promptTemplate,
            verbose: true,
        });
        //our chain extracts a list of urls
        const urls = await chain.predict({
            response: response,
            query: query,
        });
        //sending list of urls to a client

        //TODO: extract text from each link
        //TODO:create summaries for each extrated data
        return NextResponse.json(urls);
    } catch (err) {
        throw new Error(err);
    }
}
