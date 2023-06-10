export type Item = {
    name: string;
    path: string;
    slug: string;
};

export const directories: Item[] = [
    { name: "Translate", path: "/translate", slug: "translate" },
    { name: "Chat", path: "/chat", slug: "chat" },
    { name: "Emails", path: "/emails", slug: "emails" },
    { name: "Experiment", path: "/experiment", slug: "experiment" },
];
