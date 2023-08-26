import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const terminal = body.terminal;

        const model = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-3.5-turbo",
            temperature: 0.7,
            maxTokens: 1000,
        });

        const template =
            "User will provide you a task to do. <<{terminal_command}>>. You need to provide macOs terminal command that performs this task. Only command, dont write descriptions.";
        const prompt = new PromptTemplate({
            template: template,
            inputVariables: ["terminal_command"],
        });

        const chain = new LLMChain({ llm: model, prompt: prompt });
        const res = await chain.call({
            terminal_command: terminal,
        });
        console.log(res);
        return NextResponse.json(res.text);
    } catch (err) {
        return NextResponse.json(err);
    }
}
