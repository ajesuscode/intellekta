"use client";
import React, { useState } from "react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import Drawer from "./Drawer";
import { directories } from "@/lib/directories/directories";

function Navbar() {
    const [navbar, setNavbar] = useState(false);
    return (
        <>
            <nav className="w-full fixed z-10">
                <div className="flex flex-col justify-between px-4 lg:min-w-7xl bg-base-200 lg:flex-row lg:py-3 ">
                    <div>
                        <div className="flex flex-col justify-between py-3 md:block">
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-between lg:hidden md:hidden ${
                                navbar ? "block" : "hidden"
                            }`}
                        >
                            {directories.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={item.path}
                                    className="hover:cursor-pointer"
                                >
                                    <div
                                        className="pt-8 mx-8"
                                        onClick={() => setNavbar(!navbar)}
                                    >
                                        <span className="font-body font-bold text-lg">
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                            <ThemeToggler />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
