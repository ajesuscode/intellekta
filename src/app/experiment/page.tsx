"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { parseJsonArray } from "../../utils/parse";
import { type } from "os";

export default function ExperimentPage() {
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getExperiments() {
        try {
            if (query === "") {
                setError("Provide theme to extract");
                return;
            } else {
                setQuery("");
                setLoading(true);
                const res = await fetch("api/experiment", {
                    method: "POST",
                    body: JSON.stringify({ query }),
                });
                const data = await res.json();

                if (data.error) {
                    setError(data.error);
                    setLoading(false);
                } else {
                    console.log(data);
                    setResult(parseJsonArray(data));
                    setLoading(false);
                }
            }
        } catch (err) {
            setError(err);
        }
    }
    console.log(result);

    return (
        <div className="flex flex-col h-full font-body pt-12 lg:px-12">
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
            <h2 className="text-2xl font-black pb-8 font-display">
                Experimental analysys of provided theme
            </h2>
            <textarea
                className="textarea textarea-bordered max-h-8 mb-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Theme to extract"
            ></textarea>

            <button
                className="btn btn-secondary btn-sm w-24"
                onClick={getExperiments}
            >
                {loading ? (
                    <span className="loading loading-infinity loading-lg "></span>
                ) : (
                    <span>RESEARCH</span>
                )}
            </button>

            <div className="max-h-md overflow-y-auto mt-8">
                {result.length !== 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
                        {result.map((item, index) => (
                            <div
                                key={index}
                                className=" flex flex-col mt-4 bg-base-200 rounded-lg p-4 gap-2 shadow-md"
                            >
                                <a
                                    href={item.link}
                                    target="_blank"
                                    className="text-xl font-bold text-secondary"
                                >
                                    {item.company}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
