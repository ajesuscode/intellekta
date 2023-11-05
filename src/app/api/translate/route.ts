import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// export const runtime = "edge";

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
        // const templates = `You will be provided with word, phrase or sentence. You need to detect what is the language of << {input} >>. Responde only with translation of input into ${native}.`;
        // const prompt = new PromptTemplate({
        //     template: template,
        //     inputVariables: ["input"],
        // });

        const translationPromptTemplate = PromptTemplate.fromTemplate(
            `You will be provided with word, phrase, sentence or multiple sentences. First, you need to detect what is the language of this << {input} >>. Than you do grammarly correct translation into ${native}. Responde only with translation.`
        );
        // const chain = new LLMChain({ llm: model, prompt: prompt });
        const chain = translationPromptTemplate.pipe(model);
        const res = await chain.invoke({
            input: body.input,
        });
        return NextResponse.json(res);
    } catch (err) {
        throw NextResponse.json(err);
    }
}
