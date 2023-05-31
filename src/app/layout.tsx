import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en">
            <body className={inter.className}>
                <Navbar title={metadata.title} />
                <main className="bg-zinc-950 h-screen p-8">{children}</main>
            </body>
        </html>
    );
}
