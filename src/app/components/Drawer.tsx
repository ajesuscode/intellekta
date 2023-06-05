"use client";
import React, { ReactNode, useState } from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { directories, type Item } from "@/lib/directories/directories";

interface DrawerProps {
    children: ReactNode;
}

export default function Drawer({ children }: DrawerProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <main
            className={
                "flex-0 overflow-hidden z-10 inset-0 transform ease-in-out" +
                (isOpen
                    ? "transition-all duration-500 transform translate-x-0 w-52 h-screen"
                    : "transition-all duration-500 transform fixed w-16")
            }
        >
            <section
                className={
                    "left-0 absolute bg-base-200 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                    (isOpen
                        ? "transition-all duration-500 transform translate-x-0 w-52 max-w-xs"
                        : "transition-all duration-500 transform  w-16")
                }
            >
                <article
                    className={
                        "relative w-full max-w-xs pb-10 flex flex-col space-y-6 overflow-y-scroll h-full "
                    }
                >
                    <header className="flex flex-row justify-between px-4 bg-base-300">
                        <div className="pl-4 p-4">
                            {isOpen ? (
                                <Link
                                    href="/"
                                    className="text-primary font-bold text-lg"
                                >
                                    Intellekta
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="text-primary font-bold text-lg"
                                >
                                    I
                                </button>
                            )}
                        </div>
                        <button
                            hidden={!isOpen}
                            onClick={() => setIsOpen(false)}
                            className="text-base-100 hover:text-gray-700 focus:outline-none focus:text-gray-500"
                        >
                            <ChevronDoubleLeftIcon className="h-6 w-6 text-base-100" />
                        </button>
                    </header>
                    <div className="flex flex-col px-4 gap-2">
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
            <>
                {isOpen ? (
                    <Link
                        href={`${item.path}`}
                        className={
                            "flex flex-row font-normal text-md p-2 " +
                            (isActive
                                ? "p-2 px-4 rounded-lg hover:bg-emerald-700 bg-primary text-base-300"
                                : "p-2 px-4 rounded-lg hover:bg-zinc-800 text-neutral")
                        }
                    >
                        <div>{item.name}</div>
                    </Link>
                ) : (
                    <Link
                        href={`${item.path}`}
                        className={
                            "flex flex-row font-normal text-md p-2 justify-centre items-center" +
                            (isActive
                                ? "p-4 rounded-lg hover:bg-emerald-600 bg-emerald-700 text-base-300"
                                : "p-4 rounded-lg hover:bg-zinc-800 text-neutral")
                        }
                    >
                        <div className="">{item.name.slice(0, 1)}</div>
                    </Link>
                )}
            </>
        );
    }
}
