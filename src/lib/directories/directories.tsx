import { ReactElement } from "react";
import {
    TranslatorIcon,
    IconProps,
    ChatIcon,
    EmailIcon,
    ExperimetnsIcon,
    TutorIcon,
    TerminalIcon,
} from "@/components/icons/icons";

export type Item = {
    name: string;
    path: string;
    slug: string;
    icon: ReactElement<IconProps>;
};

export const directories: Item[] = [
    {
        name: "Translate",
        path: "/translate",
        slug: "translate",
        icon: <TranslatorIcon size={20} color="text-accent" />,
    },
    {
        name: "Chat",
        path: "/chat",
        slug: "chat",
        icon: <ChatIcon size={20} color="text-accent" />,
    },
    {
        name: "Emails",
        path: "/emails",
        slug: "emails",
        icon: <EmailIcon size={20} color="text-accent" />,
    },
    {
        name: "Experiment",
        path: "/experiment",
        slug: "experiment",
        icon: <ExperimetnsIcon size={20} color="text-accent" />,
    },
    {
        name: "Language Tutor",
        path: "/tutor",
        slug: "tutor",
        icon: <TutorIcon size={20} color="text-accent" />,
    },
    {
        name: "Developer",
        path: "/developer",
        slug: "developer",
        icon: <TerminalIcon size={20} color="text-accent" />,
    },
];
