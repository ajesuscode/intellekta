"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type Message = {
    type: "apiMessage" | "userMessage";
    message: string;
    isStreaming?: boolean;
};

export default function Chat() {
    const [query, setQuery] = useState("");
    const [messageState, setMessageState] = useState<{
        messages: Message[];
        pending?: string;
        history: [string, string][];
    }>({
        messages: [
            {
                message: "Hi! I am Intellekta. How I can help you?",
                type: "apiMessage",
            },
        ],
        history: [],
    });
    const { messages, pending, history } = messageState;
    const [loading, setLoading] = useState(false);

    const messageListRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Auto scroll chat to bottom
    useEffect(() => {
        const messageList = messageListRef.current;
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }, [messages]);

    // Focus on text field on load
    useEffect(() => {
        textAreaRef.current?.focus();
    }, []);

    async function getChat(event: any) {
        event.preventDefault();

        const question = query.trim();
        if (question === "") {
            return;
        }

        try {
            setMessageState((state) => ({
                ...state,
                messages: [
                    ...state.messages,
                    {
                        type: "userMessage",
                        message: question,
                    },
                ],
                pending: undefined,
            }));

            setLoading(true);
            setQuery("");
            setMessageState((state) => ({ ...state, pending: "" }));

            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ question, history }),
            });
            const data = await res.json();
            console.log(data);
            setMessageState((state) => ({
                history: [...state.history, question],
                messages: [
                    ...state.messages,
                    {
                        type: "apiMessage",
                        message: data,
                    },
                ],
                pending: undefined,
            }));
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleEnter = (e: any) => {
        if (e.key === "Enter" && query) {
            if (!e.shiftKey && query) {
                getChat(e);
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const chatMessages = useMemo(() => {
        return [
            ...messages,
            ...(pending ? [{ type: "apiMessage", message: pending }] : []),
        ];
    }, [messages, pending]);

    return (
        <section className="relative w-full h-full transition-width flex flex-col overflow-hidden items-stretch flex-1 p-10">
            <div
                ref={messageListRef}
                className="bg-base-200/25 shadow-lg p-8 rounded-lg  overflow-y-auto relative mb-32"
            >
                {chatMessages.map((message, index) => {
                    let icon;
                    let bubble;

                    if (message.type === "apiMessage") {
                        icon = (
                            <UserCircleIcon className="w-10 h-10 text-secondary" />
                        );
                        bubble = (
                            <div className="chat-bubble bg-secondary/50">
                                <ReactMarkdown linkTarget="_blank">
                                    {message.message}
                                </ReactMarkdown>
                            </div>
                        );
                    } else {
                        icon = (
                            <UserCircleIcon className="w-10 h-10 text-primary" />
                        );
                        bubble = (
                            <div className="chat-bubble bg-primary/50">
                                <ReactMarkdown linkTarget="_blank">
                                    {message.message}
                                </ReactMarkdown>
                            </div>
                        );
                    }

                    return (
                        <div key={index} className="chat chat-start">
                            <div className="chat-image avatar">{icon}</div>
                            {bubble}
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
                <form
                    className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
                    onSubmit={getChat}
                >
                    <div className="relative flex h-full flex-1 items-stretch md:flex-col shadow-lg rounded-lg flex-row justify-between">
                        <div className="flex p-2 bg-base-200 rounded-lg shadow-lg">
                            <textarea
                                className="textarea resize-none bg-base-200 w-full pl-4 pr-10 rounded-lg"
                                onKeyDown={handleEnter}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={
                                    loading
                                        ? "Please wait..."
                                        : "Ask Intellekta here..."
                                }
                                value={query}
                                ref={textAreaRef}
                            ></textarea>
                        </div>
                        <div className="flex">
                            <button className="btn btn-sm btn-secondary absolute p-2 right-3 self-center bottom-7 rounded-md md:p-2 text-white transition-colors disabled:opacity-40">
                                {loading ? (
                                    <span className="loading loading-dots loading-xs"></span>
                                ) : (
                                    <PaperAirplaneIcon className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
