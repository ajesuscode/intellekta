"use client";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const languages: string[] = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Chinese",
    "Ukrainian",
    "Basque",
    // Add more languages as needed
];

export default function Translate() {
    const [query, setQuery] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [native, setNative] = useState("Ukrainian");
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    const [showCopiedText, setShowCopiedText] = useState<boolean>(false);

    async function getTranslation(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(query);
        console.log(native);
        try {
            setLoading(true);
            if (query === "") {
                setLoading(false);
                return;
            } else {
                const res = await fetch("/api/translate", {
                    method: "POST",
                    body: JSON.stringify({
                        input: query,
                        native: native,
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

    const handleNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNative(e.target.value);
        console.log(e.target.value);
    };

    const handleClear = (): void => {
        setQuery("");
    };

    const handlePaste = async (): Promise<void> => {
        try {
            const text = await navigator.clipboard.readText();
            setQuery(text);
        } catch (error) {
            console.error("Failed to read clipboard contents: ", error);
        }
    };

    const handleShowCopiedText = (): void => {
        copyToClipboard(result);
        setShowCopiedText(true);
        setTimeout(() => {
            setShowCopiedText(false);
        }, 2000);
    };

    const paragraphs = result.split("\n").map((paragraph, index) => (
        <p key={index} className="mb-1">
            {paragraph}
        </p>
    ));

    return (
        <section className="pt-16 lg:px-48 px-6 md:px-20 flex flex-col gap-8">
            <form onSubmit={getTranslation} className="flex flex-col gap-8">
                <div className="text-xl font-display">translator</div>
                <div className="relative">
                    <textarea
                        className="textarea textarea-bordered w-full resize-none text-lg shadow-md font-body"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={
                            loading
                                ? "Detecting language...Translating"
                                : "Paste text here and Ai will detect language"
                        }
                        disabled={loading}
                        value={query}
                    ></textarea>
                    {query === "" ? (
                        <button
                            type="button"
                            onClick={handlePaste}
                            className="absolute top-0 right-0 m-2 p-2 btn  btn-xs py-1 px-4"
                        >
                            <span className="fobt-body">paste</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute top-0 right-0 m-2 p-2 btn  btn-xs py-1 px-4"
                        >
                            <span className="font-body">clear</span>
                        </button>
                    )}
                </div>
                <button
                    disabled={loading}
                    className="btn btn-secondary btn-sm btn-outline w-36 disabled:opacity-40 font-body"
                    type="submit"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-xs"></span>
                    ) : (
                        <span>translate</span>
                    )}
                </button>

                <select
                    className="w-36 rounded-lg select select-bordered select-sm select-primary font-body"
                    value={native}
                    onChange={handleNativeChange}
                >
                    {languages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
                {result && (
                    <div className="card w-full h-full max-h-sm overflow-y-auto max-h-lg flex flex-col bg-zinc-800 shadow-md rounded-lg p-4 relative">
                        <div className="text-lg text-primary font-body">
                            {paragraphs}
                        </div>

                        {showCopiedText ? (
                            <span className="absolute top-0 right-0 m-2 p-2 text-xs bg-black/10 text-secondary rounded">
                                Copied!
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleShowCopiedText}
                                className="absolute top-0 right-0 m-2 p-2 btn btn-ghost btn-square btn-sm"
                            >
                                <ClipboardDocumentIcon className="w-4 h-4 text-secondary" />
                            </button>
                        )}
                    </div>
                )}
            </form>
        </section>
    );
}
