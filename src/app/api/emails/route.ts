import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { model } from "app/config/openai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);
        return NextResponse.json(
            "This should fix the error you're seeing. I hope this helps, and I apologize for any confusion."
        );
    } catch (err) {
        return NextResponse.json(err);
    }
}
