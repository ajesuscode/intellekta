"use client";
import React, { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

type DeveloperButtonProps = {
    label: string;
    value: string;
    onTaskSubmit: (value: string) => Promise<void>;
};

const BUTTONS = [
    { label: "TS Component", value: "componentCreation" },
    { label: "Tailwind", value: "tailwind" },
    { label: "Styled Comp", value: "styledcomponents" },
    { label: "Refactor", value: "refactor" },
    { label: "Code Review", value: "codeReview" },
    { label: "Terminal", value: "terminal" },
];

const DeveloperButton: React.FC<DeveloperButtonProps> = ({
    label,
    value,
    onTaskSubmit,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await onTaskSubmit(value);
        setIsLoading(false);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className="btn btn-secondary btn-sm btn-outline w-36 disabled:opacity-40 font-body"
        >
            {isLoading ? (
                <span className="loading loading-dots loading-xs"></span>
            ) : (
                label
            )}
        </button>
    );
};

const RenderContentElements = (result: string) => {
    let inCodeBlock = false;
    let accumulatedCode = "";

    return result.split("\n\n").flatMap((block, idx) => {
        if (block.startsWith("```")) {
            inCodeBlock = true;
            accumulatedCode = block.slice(3) + "\n"; // remove starting "```" and keep newline
            return [];
        } else if (block.endsWith("```")) {
            inCodeBlock = false;
            accumulatedCode += block.slice(0, -3); // remove ending "```"

            const content = (
                <div key={idx} className="my-2 relative">
                    <pre className="block p-4 overflow-x-auto bg-code-bg leading-snug rounded-md">
                        <code className="text-sm text-white">
                            {accumulatedCode.trim()}
                        </code>
                    </pre>
                    <ClipboardButton content={accumulatedCode.trim()} />
                </div>
            );
            accumulatedCode = ""; // reset accumulated code
            return content;
        } else if (inCodeBlock) {
            accumulatedCode += block + "\n"; // keep appending the code
            return [];
        }

        // If not in a code block, split by '\n' and render each line in a <p> tag
        return block.split("\n").map((textLine, lineIdx) => (
            <p key={`${idx}-${lineIdx}`} className="my-2 text-sm">
                {textLine}
            </p>
        ));
    });
};

function RenderTextAndCode({ result }: { result: string }) {
    const contentElements = RenderContentElements(result);

    return (
        <div className=" w-full h-full flex flex-col bg-zinc-800 shadow-md rounded-lg p-4 relative overflow-y-auto">
            <div className="text-lg text-primary font-body">
                {contentElements}
            </div>
            <ClipboardButton content={result} />
        </div>
    );
}

const ClipboardButton: React.FC<{ content: string }> = ({ content }) => {
    const [, copyToClipboard] = useCopyToClipboard();
    return (
        <button
            onClick={() => copyToClipboard(content)}
            className="absolute top-0 right-0 m-2 p-2 btn btn-ghost btn-square btn-sm"
        >
            <ClipboardDocumentIcon className="w-4 h-4 text-secondary" />
        </button>
    );
};

export default function Developer() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");

    const handleDeveloperTask = async (value: string) => {
        if (!query) return;

        try {
            const res = await fetch("/api/developer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: query, template: value }),
            });

            setResult(await res.json());
        } catch (err) {
            console.error(err);
        } finally {
            setQuery("");
        }
    };

    return (
        <div className="h-full flex flex-row gap-20 jsutify-center items-start w-full lg:px-24 px-6 md:px-12 ">
            <div className=" flex flex-col gap-8 h-full w-3/4">
                <form
                    onSubmit={() => handleDeveloperTask(query)}
                    className="flex flex-col gap-8"
                >
                    <div className="text-xl font-display">developer</div>
                    <textarea
                        className="textarea textarea-bordered w-full resize-none text-lg shadow-md font-body"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Write what you want to develop"
                        value={query}
                    />
                </form>
                <div className="overflow-y-auto">
                    <RenderTextAndCode result={result} />
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-start items-start">
                <div className="pb-32">
                    <span className="font-display">Task Workers</span>
                </div>
                {BUTTONS.map(({ label, value }) => (
                    <DeveloperButton
                        key={value}
                        label={label}
                        value={value}
                        onTaskSubmit={handleDeveloperTask}
                    />
                ))}
            </div>
        </div>
    );
}
