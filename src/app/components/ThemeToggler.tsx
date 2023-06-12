"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";

export default function ThemeToggler() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);
    if (!mounted) {
        return null;
    }

    console.log(mounted);
    console.log(resolvedTheme);

    return (
        <div className="flex flex-row gap-4 justify-center items-center">
            <input
                type="checkbox"
                className="toggle toggle-sm dark:toggle-secondary toggle-primary"
                checked={resolvedTheme === "dark"}
                onChange={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
            />
            {resolvedTheme === "dark" ? (
                <MoonIcon className="w-4 h-4 dark:text-secondary" />
            ) : (
                <SunIcon className="w-4 h-4 text-primary" />
            )}
        </div>
    );
}
