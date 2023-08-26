"use client";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

// const languages: string[] = [
//     "English",
//     "Spanish",
//     "French",
//     "German",
//     "Italian",
//     "Japanese",
//     "Chinese",
//     "Ukrainian",
//     "Basque",
//     // Add more languages as needed
// ];

export default function Terminal() {
    const [query, setQuery] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [language, setLanguage] = useState("English");
    const [native, setNative] = useState("Ukrainian");
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    async function getTerminalCommand(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(query);
        try {
            setLoading(true);
            if (query === "") {
                setLoading(false);
                return;
            } else {
                setQuery("");
                const res = await fetch("/api/callterminal", {
                    method: "POST",
                    body: JSON.stringify({
                        terminal: query,
                    }),
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

    // const handleNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setNative(e.target.value);
    //     console.log(e.target.value);
    // };

    const paragraphs = result.split("\n").map((paragraph, index) => (
        <p key={index} className="mb-1">
            {paragraph}
        </p>
    ));
    return (
        <section className="pt-16 lg:px-48 px-6 md:px-20 flex flex-col gap-8">
            <form onSubmit={getTerminalCommand} className="flex flex-col gap-8">
                <div className="text-xl font-display">terminal</div>
                <textarea
                    className="textarea textarea-bordered w-full resize-none text-lg shadow-md font-body"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                        loading
                            ? "Preparing command..."
                            : "Paste text here and Ai will detect language"
                    }
                    disabled={loading}
                    value={query}
                ></textarea>
                <button
                    disabled={loading}
                    className="btn btn-secondary btn-sm btn-outline w-36 disabled:opacity-40 font-body"
                    type="submit"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-xs"></span>
                    ) : (
                        <span>Command</span>
                    )}
                </button>

                {paragraphs && (
                    <div className="card w-full h-full max-h-sm overflow-y-auto max-h-lg flex flex-col bg-zinc-800 shadow-md rounded-lg p-4 relative">
                        <div className="text-lg text-primary font-body">
                            {paragraphs}
                        </div>
                        <button
                            onClick={() => copyToClipboard(result)}
                            className="absolute top-0 right-0 m-2 p-2 btn btn-ghost btn-square btn-sm"
                        >
                            <ClipboardDocumentIcon className="w-4 h-4 text-secondary" />
                        </button>
                    </div>
                )}
            </form>
        </section>
    );
}
