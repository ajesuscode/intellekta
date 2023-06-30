import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export async function POST(req: NextRequest) {
    try {
        const model = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-4-0613",
            temperature: 0,
            maxTokens: 1000,
        });
        const body = await req.json();
        const native = body.native;
        const template = `You will be provided with word, phrase or sentence. You need to detect what is the language of << {input} >>. Responde only with translation of input into ${native}.`;
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
        throw NextResponse.json(err);
    }
}
