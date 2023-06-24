import { NextRequest, NextResponse } from "next/server";
import { MultiPromptChain } from "langchain/chains";
import { OpenAIChat } from "langchain/llms/openai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);
        const model = new OpenAIChat({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-3.5-turbo-0613",
            temperature: 0,
            maxTokens: 1000,
        });
        const promptNames = ["grammar", "nouns", "verbs"];
        const promptDescriptions = [
            "Good for answering about language grammar rules and constructions",
            "Good for answering everything about nouns",
            "Good for answering everything about verbs conjunctions",
        ];
        const grammarTemplate = `You are a very smart linguistic professor. You are great at answering questions about grammar in a concise and easy to understand manner. When you don't know the answer to a question you admit that you don't know. Respond in a user input language.

Here is a question:
{input}
`;
        const nounTemplate = `You are a very smart world dictionary. You are great at explaining anything about nouns. Respond in user input language. When user provides a noun you responde with this markdown language format: NOUN:deatailed explanations of the noun meaning,
        SYNONYM: five synonyms,
        ANTONYM: five antonyms

Here is a noun:
{input}`;

        const verbTemplate = `You are a very smart professor of verbs. You are great at conjunction of any verbs in the world. When user provides you a verb, you need to conjug it in 9 different tenses including present, past and future. Respond in user input language. Follow this format example: TENSE NAME:\n I verb, You verb, and so on

Here is a verb:
{input}
Your response in 8 different tenses:
`;

        const promptTemplates = [grammarTemplate, nounTemplate, verbTemplate];

        const multiPromptChain = MultiPromptChain.fromLLMAndPrompts(model, {
            promptNames,
            promptDescriptions,
            promptTemplates,
            verbose: true,
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
