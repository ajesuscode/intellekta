"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { directories, type Item } from "@/lib/directories/directories";

interface DrawerProps {
    children: ReactNode;
}

export default function Drawer({ children }: DrawerProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <main
            className={
                "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-0 inset-0 transform ease-in-out " +
                (isOpen
                    ? "transition-all duration-500 transform translate-x-0 w-64"
                    : "transition-all duration-500 transform fixed w-10")
            }
        >
            <section
                className={
                    "left-0 absolute bg-zinc-900 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                    (isOpen
                        ? "transition-all duration-500 transform translate-x-0 w-64 max-w-xs"
                        : "transition-all duration-500 transform  w-10")
                }
            >
                <article
                    className={
                        "relative w-full max-w-xs pb-10 flex flex-col space-y-6 overflow-y-scroll h-full "
                    }
                >
                    <header className="flex flex-row justify-between p-4 ">
                        <div className="text-emerald-600 font-bold text-lg ">
                            {isOpen ? (
                                <Link href="/">Intellekta</Link>
                            ) : (
                                <button onClick={() => setIsOpen(true)}>
                                    I
                                </button>
                            )}
                        </div>
                        <button
                            hidden={!isOpen}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                        >
                            X
                        </button>
                    </header>
                    <div className="flex flex-col p-10 gap-8">
                        {directories.map((item, index) => (
                            <DirItem key={index} item={item} />
                        ))}
                    </div>
                </article>
            </section>
            {/* <section
                className="w-screen h-full cursor-pointer"
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section> */}
        </main>
    );

    function DirItem({ key, item }: { item: Item }) {
        const segment = useSelectedLayoutSegment();
        console.log(segment);
        const isActive = item.slug === segment;
        console.log(isActive);
        return (
            <Link
                href={`${item.path}`}
                className={
                    "text-emerald-300 font-bold text-xs" +
                    (isActive
                        ? "text-zinc-300 bg-emerald-700 rounded-lg p-4"
                        : "text-emerald-300")
                }
            >
                {item.name}
            </Link>
        );
    }
}
