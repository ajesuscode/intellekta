import { NextRequest, NextResponse } from "next/server";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder,
    PromptTemplate,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);

        const chat = new ChatOpenAI({
            modelName: "gpt-3.5-turbo",
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.9,
            maxTokens: 1000,
        });
        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
                "Anlways tespond in Markdown format."
            ),
            new MessagesPlaceholder("history"),
            HumanMessagePromptTemplate.fromTemplate("{input}"),
        ]);

        console.log("CHAT PROMPT", chatPrompt);
        const chain = new ConversationChain({
            memory: new BufferMemory({
                returnMessages: true,
                memoryKey: "history",
            }),
            prompt: chatPrompt,
            llm: chat,
        });

        console.log("CHAIN OBJECT", chain);
        const res = await chain.call({
            input: body.question,
        });
        console.log(res);
        return NextResponse.json(res.response);
    } catch (err) {
        throw new Error(err);
    }
}
