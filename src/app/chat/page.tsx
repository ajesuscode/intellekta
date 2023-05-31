"use client";
import { useState } from "react";

export default function Chat() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    async function getChat() {
        event.preventDefault();
        console.log(query);

        try {
            setLoading(true);
            if (query === "") {
                setLoading(false);
                return;
            } else {
                setQuery("");
                const res = await fetch("/api/chat", {
                    method: "POST",
                    body: JSON.stringify(query),
                });
                const text = await res.json();
                console.log(text);
                setResult(text);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const paragraphs = result.split("\n").map((paragraph, index) => (
        <p key={index} className="mb-1">
            {paragraph}
        </p>
    ));
    return (
        <div>
            <form onSubmit={getChat}>
                <div className="text-zinc-300 font-bold text-5xl">chat</div>;
                <div className="flex flex-col w-96 py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                    <textarea
                        className="m-0 w-full max-h-48 overflow-y-hidden h-8 resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus:outline-none dark:bg-transparent pl-2 md:pl-0"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter your text"
                        value={query}
                    ></textarea>
                    <button
                        className="bg-emerald-500 absolute p-1 rounded-md text-zinc-300 bottom-1 md:bottom-2.5 hover:bg-emerald-700 enabled:dark:hover:text-gray-400 dark:hover:bg-emerald-700 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40"
                        type="submit"
                    >
                        answer
                    </button>
                </div>
            </form>

            {paragraphs && (
                <div className="flex flex-col bg-zinc-800 shadow-md rounded-lg max-w-lg p-4 mt-8">
                    <div className="text-xs text-emerald-500 font-medium">
                        {paragraphs}
                    </div>
                </div>
            )}
        </div>
    );
}
