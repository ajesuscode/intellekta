import Drawer from "./components/Drawer";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
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
            <body className="h-screen bg-base-100">
                <Suspense fallback="...">
                    {/* @ts-expect-error Server Component */}
                    <Navbar />
                    <main className="flex w-full flex-row h-full">
                        <Drawer />
                        <div className="px-4 pt-12 lg:p-16 flex-1 w-screen ">
                            {children}
                        </div>
                    </main>
                </Suspense>
            </body>
        </html>
    );
}
