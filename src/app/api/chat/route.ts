import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export async function POST(req: NextRequest) {
    try {
        const chat = new ChatOpenAI({
            modelName: "gpt-3.5-turbo",
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.9,
            maxTokens: 1000,
        });
        const body = await req.json();
        const res = await chat.call([
            new SystemChatMessage("You are a helpful assistant."),
            new HumanChatMessage(body),
        ]);
        console.log(res.text);
        return NextResponse.json(res.text);
    } catch (err) {
        throw new Error(err);
    }
}
