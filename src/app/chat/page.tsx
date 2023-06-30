"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type Message = {
    type: "apiMessage" | "userMessage";
    message: string;
    isStreaming?: boolean;
};

export default function Chat() {
    const messageListRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { messages, input, handleInputChange, handleSubmit } = useChat();

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

    return (
        <section className="relative w-full h-full transition-width flex flex-col overflow-hidden items-stretch flex-1 pb-10 pt-10 font-body">
            <div
                ref={messageListRef}
                className="bg-base-200/25 shadow-lg p-4 md:p-8 rounded-lg overflow-y-auto relative mb-32"
            >
                {messages.map((message, index) => {
                    let icon;
                    let bubble;

                    if (message.role === "user") {
                        icon = (
                            <UserCircleIcon className="w-10 h-10 text-secondary" />
                        );
                        bubble = (
                            <div className="chat-bubble bg-secondary/50">
                                <ReactMarkdown linkTarget="_blank">
                                    {message.content}
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
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        );
                    }

                    return (
                        <div key={message.id} className="chat chat-start">
                            <div className="chat-image avatar">{icon}</div>
                            {bubble}
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 left-0 w-full pt-2">
                <form
                    className=" flex flex-col md:flex-row gap-3 last:mb-2  md:last:mb-6 mx-auto "
                    onSubmit={handleSubmit}
                >
                    <div className="relative flex h-full flex-1 items-stretch md:flex-col shadow-lg rounded-lg  justify-between">
                        <div className="flex flex-1 p-2 bg-base-200 rounded-lg shadow-lg">
                            <textarea
                                className="textarea resize-none bg-base-200 w-full pl-4 pr-10 rounded-lg"
                                // onKeyDown={handleSubmit}
                                onChange={handleInputChange}
                                // placeholder={
                                //     isLoading
                                //         ? "Please wait..."
                                //         : "Ask Intellekta here..."
                                // }
                                value={input}
                                ref={textAreaRef}
                            ></textarea>
                        </div>
                        <div className="flex">
                            <button className="btn btn-sm btn-secondary absolute p-2 right-3 self-center bottom-7 rounded-md md:p-2 text-white transition-colors disabled:opacity-40">
                                {/* {isLoading ? (
                                <span className="loading loading-dots loading-xs"></span>
                            ) : ( */}
                                <PaperAirplaneIcon className="w-4 h-4" />
                                {/* )} */}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
