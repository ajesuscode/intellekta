"use client";
import { useState } from "react";

export default function Tutor() {
    const [query, setQuery] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function askTutor() {
        try {
            if (query === "") {
                return;
            } else {
                setIsLoading(true);
                const res = await fetch("/api/tutor", {
                    method: "POST",
                    body: JSON.stringify({
                        query,
                    }),
                });
                setQuery("");
                const text = await res.json();
                setResult(text);
                setIsLoading(false);
            }
        } catch (err) {}
    }
    console.log(result);
    const paragraphs = result.split("\n").map((paragraph, index) => (
        <p key={index} className="mb-2 text-sm">
            {paragraph}
        </p>
    ));
    return (
        <div className="h-full p-8 mx-auto flex flex-col gap-4 font-body pt-16 lg:px-48 px-12 md:px-20">
            <span className="text-primary font-display">TUTOR PAGE</span>
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="textarea textarea-sm bg-neutral text-xl"
            ></textarea>
            <button
                className="btn btn-sm btn-primary"
                onClick={askTutor}
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                ) : (
                    <span>ASK</span>
                )}
            </button>
            <div className="flex flex-col h-96">{paragraphs}</div>
        </div>
    );
}
