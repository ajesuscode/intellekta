import { NextRequest, NextResponse } from "next/server";
import { MultiPromptChain } from "langchain/chains";
import { OpenAIChat } from "langchain/llms/openai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);
        const model = new OpenAIChat({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-4",
            temperature: 0,
            maxTokens: 300,
        });
        const promptNames = ["grammar", "explainer", "verbs"];
        const promptDescriptions = [
            "Detects grammar mistakes and provide grammar correction",
            "Detects user demand for langiage rules and grammar explanations",
            "Detects verbs and provides conjugation",
        ];
        const grammarTemplate = `You are language gramar professor. If user input is more than 1 word, You must detect a grammar mistake and correct them if they exist in any provided to you language. If there ane no mistakes in user input, answer "EVERYTHING IS OK". Provide only correction. Dont write descriptions. Dont answer questions. User input will be inside #### Here is a phrase: #### {input} #### Correct response:
`;
        const explainerTemplate = `You can explain everything that is related to language rules and grammar. Provide explanation with analogies and 4 examples. User input will be inside #### Here is a phrase: #### {input} ####
`;

        const verbTemplate = `You are a very smart professor of all languages verbs. You are great at conjunction of any verbs in the world. When user provides you a verb, you need to conjug it in 9 different tenses including present, past and future. Respond in user input language. Follow this format example: TENSE NAME: I verb, You verb, and so on
        User input will be inside #### Here is a verb: #### {input} #### Your response in 9 different tenses:
`;

        const promptTemplates = [
            grammarTemplate,
            explainerTemplate,
            verbTemplate,
        ];

        const multiPromptChain = MultiPromptChain.fromLLMAndPrompts(model, {
            promptNames,
            promptDescriptions,
            promptTemplates,
        });
        const response = multiPromptChain.call({
            input: body.query,
        });
        const [{ text: answer }] = await Promise.all([response]);
        return NextResponse.json(answer);
    } catch (err) {
        return NextResponse.json({ error: `Error: ${err}` }, { status: 500 });
    }
}
