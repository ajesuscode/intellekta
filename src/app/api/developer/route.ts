import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const task = body.task;
        const clientTemplate = body.template;
        const model = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-3.5-turbo",
            temperature: 0,
            maxTokens: 3000,
        });

        let template = "Provide answer in a friendly form";

        switch (clientTemplate) {
            case "terminal":
                template =
                    "User will provide you a task to do. <<{task}>>. You need to provide macOs terminal command that performs this task. Only command, dont write descriptions.";
                break;
            case "tailwind":
                template =
                    "Act as experienced frontend developer. Do this: <<{task}>>. Provide response using tailwind as a styling.";
                break;
            case "styledcomponents":
                template =
                    "Act as experienced frontend developer. Do this: <<{task}>>. Provide response using styledcomponents as a styling.";
                break;
            case "refactor":
                template =
                    "The user will provide you with a piece of code. Your task is to refactor the given code <<{task}>> to make it cleaner, more efficient, and maintainable, without altering its functionality. Provide the refactored code in code bloq.";
                break;
            case "codeReview":
                template =
                    "The user has shared a code snippet: <<{task}>>. Please review the code for any bugs, errors, or areas of potential improvement, and provide full corrections and explanations in code blocks.";
                break;
            case "componentCreation":
                template =
                    "The user has described a functionality: <<{task}>>. Please create a TypeScript React component that implements this functionality, and provide a brief explanation of how it works. Make sure its typesafe.";
                break;
        }

        console.log(template);

        const prompt = new PromptTemplate({
            template: template,
            inputVariables: ["task"],
        });

        const chain = new LLMChain({ llm: model, prompt: prompt });
        const res = await chain.call({
            task: task,
        });
        console.log(res);
        return NextResponse.json(res.text);
    } catch (err) {
        return NextResponse.json(err);
    }
}
