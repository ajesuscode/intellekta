"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ExperimentPage() {
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);

    async function getExperiments() {
        const res = await fetch("api/experiment", {
            method: "POST",
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        if (data.error) {
            setError(data.error);
        } else {
            console.log(data);
            setResult(data);
        }
    }

    // const lists = result.split("\n").map((list, index) => (
    //     <Link
    //         key={index}
    //         className="mb-2 flex text-secondary"
    //         href={list.substring(3)}
    //     >
    //         {list}
    //     </Link>
    // ));
    console.log(result);

    return (
        <div className="flex flex-col justify-center">
            {error && (
                <div
                    className="alert alert-error"
                    onClick={() => setError(null)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Error! {error}</span>
                </div>
            )}
            <h2 className="text-2xl font-black ">
                This is experimental Page for testing Langchain Approaches
            </h2>
            <textarea
                className="textarea textarea-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            ></textarea>
            <button
                className="btn btn-lg btn-secondary"
                onClick={getExperiments}
            >
                SEND
            </button>
            <div>
                {result && (
                    <div className="flex flex-col bg-base-300 pt-8 rounded-md px-4"></div>
                )}
                {result.map((res, index) => (
                    <div
                        key={index}
                        className="flex flex-col bg-base-300 pt-8 rounded-md px-4"
                    >
                        {res}
                    </div>
                ))}
            </div>
        </div>
    );
}
