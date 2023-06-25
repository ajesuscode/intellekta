import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "intellekta",
};

export default function Home() {
    return (
        <main className="flex items-center justify-center h-full ">
            <div className="flex flex-col max-w-xl mx-auto w-full sm:w-1/2 lg:w-10/12">
                <div className="flex-1 mb-16">
                    <h1 className="font-display text-5xl">
                        Experimental multitool application with{" "}
                        <span className="text-primary text-6xl">-ai-</span>
                    </h1>
                </div>
                <div className="flex flex-col font-display text-2xl text-secondary gap-4 mb-16">
                    <span className="pr-12">Langchain</span>
                    <span className="pr-12">OpenAi</span>
                    <span className="pr-12">Stable Diffusion</span>
                    <span className="pr-12">MidJourney</span>
                </div>
                <div className="flex-1 font-body text-sm ">
                    <p>
                        You can read short documentation{" "}
                        <Link href="/docs" className="text-primary">
                            here
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
