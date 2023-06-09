import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ChatMessageHistory } from "langchain/memory";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { LLMChain } from "langchain/chains";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import axios from "axios";
import { serperSearch } from "@/app/utils/serperSearch";

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
        // async function getSearchResult() {
        //     try {
        //         let data = JSON.stringify({
        //             q: body.query,
        //         });
        //         let config = {
        //             method: "post",
        //             url: "https://google.serper.dev/search",
        //             headers: {
        //                 "X-API-KEY": "72c4402a87d287368aeb1b0210575ab0b1e76404",
        //                 "Content-Type": "application/json",
        //             },
        //             data: data,
        //         };

        //         const response = await axios(config);
        //         return JSON.stringify(response.data);
        //     } catch (error) {
        //         console.log("Axios Error:", error);

        //         // Generate an appropriate error response
        //         let errorMessage = "An error occurred";
        //         let statusCode = 500;

        //         // Check if the error response contains specific information
        //         if (error.response) {
        //             errorMessage = error.response.data.message;
        //             statusCode = error.response.status;
        //         }

        //         // Return the error response to the client
        //         return JSON.stringify({ errorMessage, statusCode });
        //     }
        // }

        //calling intilized function
        const response = await serperSearch(body.query);
        //defining template with Langchain
        const template =
            "Extract urls into a numbered list format from {response}. Above is a search result for a {query}";
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

        // extract text from each link
        const processUrls = async () => {
            try {
                // Creating an array from the URLs string
                const urlsArray = urls.split("\n").map((url) => url.trim());
                // Defining an empty array
                const results = [];
                // Running a loop on each link from the array
                for (const urlArr of urlsArray) {
                    try {
                        // Utilizing Cheerio loader from Langchain
                        const loader = new CheerioWebBaseLoader(
                            urlArr.substring(3),
                            {
                                // Selecting only p tags (assuming that all the content is under this selector)
                                selector: "p",
                            }
                        );
                        const docs = await loader.load();
                        results.push(docs);
                    } catch (error) {
                        // Handle the fetch error for a specific URL
                        console.error(`Error fetching URL: ${urlArr}`, error);
                        //continue with the loop
                        results.push(null); // Add a placeholder value or handle the error as needed
                    }
                }
                return results;
            } catch (error) {
                // Handle any other potential errors
                console.error("An error occurred during URL processing", error);
                return [];
            }
        };

        const extractedHtml = await processUrls();

        //split text into small chunks
        const smallChunks = async () => {
            const results = [];
            for (const doc of extractedHtml) {
                const splitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 3000,
                    chunkOverlap: 200,
                });
                const output = await splitter.splitDocuments(doc);
                results.push(output);
            }

            return results;
        };

        const chunks = await smallChunks();

        //create summaries for each extrated data
        const ideas = async () => {
            let ideas = [];
            const ideasTemplate =
                "You are a world class experienced investor. Analyze this information: {chunks}. Then follow this rules: Create one sentence summary.";
            const ideasPromptTemplate = new PromptTemplate({
                template: ideasTemplate,
                inputVariables: ["chunks"],
            });
            const ideasChain = new LLMChain({
                llm: model,
                prompt: ideasPromptTemplate,
                verbose: true,
            });
            for (const idea of chunks) {
                if (idea && idea.length && idea[0].pageContent) {
                    const pageContent = idea[0].pageContent;
                    const res = await ideasChain.predict({
                        chunks: pageContent,
                    });
                    ideas.push(res);
                }
            }
            return ideas;
        };

        const idea = await ideas();

        return NextResponse.json(idea);
    } catch (err) {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", err);
        return NextResponse.json({ error: `Error: ${err}` }, { status: 500 });
    }
}
