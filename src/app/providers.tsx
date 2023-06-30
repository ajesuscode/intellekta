"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState, ReactNode } from "react";

interface ProvidersProps {
    children?: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) {
        return <>{children}</>;
    }
    return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
