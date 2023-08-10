import Drawer from "@/components/Drawer";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
    title: "Intellekta",
    description: "Langchain powered multitool assistant",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-screen">
            <body className="h-screen">
                <Providers>
                    <Suspense fallback="...">
                        <Navbar />

                        <main className="flex w-full flex-row h-full ">
                            <Drawer />
                            <div className="px-4 p-12 lg:p-16 flex-1 w-screen dark:bg-base-100">
                                {children}
                            </div>
                        </main>
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}
