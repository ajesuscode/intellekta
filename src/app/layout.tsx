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
                    <div className="flex ">
                        <Drawer />
                        <div className="pt-12 flex pl-16">{children}</div>
                    </div>
                </Suspense>
            </body>
        </html>
    );
}
