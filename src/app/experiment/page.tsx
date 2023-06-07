"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ExperimentPage() {
    const [result, setResult] = useState("");
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    async function getExperiments() {
        const res = await fetch("api/experiment", {
            method: "POST",
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        console.log(data);
        setResult(data);
    }

    const lists = result.split("\n").map((list, index) => (
        <Link
            key={index}
            className="mb-2 flex text-secondary"
            href={list.substring(3)}
        >
            {list}
        </Link>
    ));
    console.log(lists);

    return (
        <div className="flex flex-col justify-center">
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
            {result && (
                <div className="flex flex-col bg-base-300 pt-8 rounded-md px-4">
                    {lists}
                </div>
            )}
        </div>
    );
}
