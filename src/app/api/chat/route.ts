import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { AIChatMessage, HumanChatMessage } from "langchain/schema";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder,
    PromptTemplate,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        const { stream, handlers } = LangChainStream();

        const llm = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-3.5-turbo",
            temperature: 0.7,
            maxTokens: 1000,
            streaming: true,
            callbackManager: CallbackManager.fromHandlers(handlers),
        });

        llm.call(
            (messages as Message[]).map((m) =>
                m.role == "user"
                    ? new HumanChatMessage(m.content)
                    : new AIChatMessage(m.content)
            )
        ).catch(console.error);

        return new StreamingTextResponse(stream);
    } catch (err) {
        throw new Error(err);
    }
}
