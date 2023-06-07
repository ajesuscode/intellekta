import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { model } from "app/config/openai";

export async function POST(req: NextRequest) {
    try {
        const model = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.9,
            maxTokens: 1000,
        });
        const body = await req.json();
        const native = body.native;
        const template = `Detect {input} language. Translate input into ${native}.`;
        const prompt = new PromptTemplate({
            template: template,
            inputVariables: ["input"],
        });
        console.log(template);
        const chain = new LLMChain({ llm: model, prompt: prompt });

        const res = await chain.call({
            input: body.input,
        });
        console.log(res.text);
        return NextResponse.json(res.text);
    } catch (err) {
        throw new Error(err);
    }
}
