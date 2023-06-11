import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { model } from "app/config/openai";

export async function POST(req: NextRequest) {
    try {
        const model = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-3.5-turbo",
            temperature: 0.7,
            maxTokens: 1000,
        });
        const body = await req.json();
        const theme = body.theme;
        const input = body.content;
        const style = body.language;
        const template =
            "Below is an atempt to write an email. You goal is: 1.Properly format and rewrite email based on theme an input. 2.Theme can be provided in any language, first try to understand the meaning of the theme. Then use it to understand which type of email to create. For example: Theme Work may have Introduction, Networking, Follow-up, Feedback, Collaboaration types. Theme Insurance may have Complaint, Request for Information, Registration types. 3.Write short and clear sentences. 4.Respond in provided language. Below is a theme, input, and language. Theme: {theme}, Input: {input}, Language: {language}. Your response: Email type used:  ";
        const prompt = new PromptTemplate({
            template: template,
            inputVariables: ["theme", "input", "language"],
        });
        const chain = new LLMChain({ llm: model, prompt: prompt });
        const res = await chain.call({
            theme: theme,
            input: input,
            language: style,
        });
        console.log(res);
        return NextResponse.json(res.text);
    } catch (err) {
        return NextResponse.json(err);
    }
}
