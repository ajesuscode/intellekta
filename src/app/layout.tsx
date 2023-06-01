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
            <body className="h-screen bg-zinc-950 ">
                <Suspense fallback="...">
                    {/* @ts-expect-error Server Component */}
                    <Navbar />
                    <Drawer />
                    <div className="pt-12"> {children}</div>
                </Suspense>
            </body>
        </html>
    );
}
