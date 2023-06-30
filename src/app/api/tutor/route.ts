import { NextRequest, NextResponse } from "next/server";
import { MultiPromptChain } from "langchain/chains";
import { OpenAIChat } from "langchain/llms/openai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);
        const model = new OpenAIChat({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-3.5-turbo",
            temperature: 0,
            maxTokens: 300,
        });
        const promptNames = ["grammar", "nouns", "verbs"];
        const promptDescriptions = [
            "Only provides language grammar correction",
            "Good for answering everything about nouns",
            "Good for answering everything about verbs conjunctions",
        ];
        const grammarTemplate = `You are language professor. You must correct grammar mistakes if they are. If there ane no mistakes in user input, answer "OK". Provide only correction. Dont write descriptions. Dont answer questions. User input will be inside ####

Here is a phrase: ####
{input}
####
Correct response:
`;
        const nounTemplate = `You are a very smart world dictionary. User will provide you a noun. You must respond in user input language. When user provides a single noun you responde with this markdown language format: NOUN:deatailed explanations of the noun meaning,
        SYNONYM: five synonyms,
        ANTONYM: five antonyms
        User input will be inside ####

Here is a noun:
####
{input}
####
`;

        const verbTemplate = `You are a very smart professor of verbs. You are great at conjunction of any verbs in the world. When user provides you a verb, you need to conjug it in 9 different tenses including present, past and future. Respond in user input language. Follow this format example: TENSE NAME:\n I verb, You verb, and so on
        User input will be inside ####
Here is a verb:
####
{input}
####
Your response in 8 different tenses:
`;

        const promptTemplates = [grammarTemplate, nounTemplate, verbTemplate];

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
