"use client";
import { useState } from "react";

const languages: string[] = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Chinese",
    "Ukrainian",
    // Add more languages as needed
];

export default function Tutors() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState("English");
    const [native, setNative] = useState("Ukrainian");

    async function getTutors() {
        event.preventDefault();
        console.log(query);
        console.log(language);
        console.log(native);
        try {
            setLoading(true);
            if (query === "") {
                setLoading(false);
                return;
            } else {
                setQuery("");
                const res = await fetch("/api/tutors", {
                    method: "POST",
                    body: JSON.stringify({
                        input: query,
                        language: language,
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

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
        console.log(e.target.value);
    };

    const handleNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNative(e.target.value);
        console.log(e.target.value);
    };

    const paragraphs = result.split("\n").map((paragraph, index) => (
        <p key={index} className="mb-1">
            {paragraph}
        </p>
    ));
    return (
        <section className="p-10 pl-64">
            <form onSubmit={getTutors}>
                <div className="text-zinc-300 font-bold text-5xl">tutors</div>
                <select
                    className="block w-32 p-2 rounded"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    {languages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
                <select
                    className="block w-32 p-2 rounded"
                    value={native}
                    onChange={handleNativeChange}
                >
                    {languages.map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
                <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
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
                        search
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
        </section>
    );
}
