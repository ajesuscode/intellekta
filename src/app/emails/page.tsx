"use client";
import React, { ChangeEvent, useCallback, useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { load } from "cheerio";

interface Template {
    id: number;
    name: string;
    theme: string;
    language: string;
    content: string;
    response?: string;
}

const languages: string[] = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Chinese",
    "Ukrainian",
    // Add more languages as needed
];

const Emails: React.FC = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<string>("");

    useEffect(() => {
        // This code will only run on the client side
        const savedTemplates = localStorage.getItem("templates");
        setTemplates(savedTemplates ? JSON.parse(savedTemplates) : []);
    }, []);

    const handleAddTemplate = useCallback(() => {
        const newTemplate: Template = {
            id: Date.now(),
            name: "",
            theme: "",
            language: "",
            content: "",
        };

        setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);
    }, []);

    const handleInputChange = useCallback(
        (
            id: number,
            field: keyof Template,
            event: ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            const value = event.target.value;
            setTemplates((prevTemplates) =>
                prevTemplates.map((template) =>
                    template.id === id
                        ? { ...template, [field]: value }
                        : template
                )
            );
        },
        []
    );

    const handleCreateEmail = useCallback(async (template: Template) => {
        try {
            if (template.content === "") {
                setAlert("You didnt wrote anything");
                setTimeout(function () {
                    setAlert("");
                }, 3000);
                return;
            }
            setLoading(true);
            const response = await fetch("api/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: template.id,
                    theme: template.theme,
                    language: template.language,
                    content: template.content,
                }),
            });

            const data = await response.json();

            // Update the template with the server's response
            setTemplates((prevTemplates) =>
                prevTemplates.map((t) =>
                    t.id === template.id ? { ...t, response: data } : t
                )
            );
            setLoading(false);
        } catch (error) {
            console.error("Failed to create email:", error);
        }
    }, []);

    const handleDeleteTemplate = useCallback((id: number) => {
        setTemplates((prevTemplates) =>
            prevTemplates.filter((template) => template.id !== id)
        );
        localStorage.setItem(
            "templates",
            JSON.stringify(templates.filter((template) => template.id !== id))
        );
    }, []);

    console.log(templates);
    return (
        <div className="w-full h-full relative flex flex-col overflow-y-auto bg-base-200/50 rounded-lg pt-8">
            {alert && (
                <div className="alert alert-warning font-body">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{alert}</span>
                </div>
            )}
            <button
                className="p-1 btn btn-secondary btn-sm fixed top-16 lg:right-16 m-4 right-6"
                onClick={handleAddTemplate}
            >
                <div
                    className="tooltip tooltip-left text-xs lowercase font-light"
                    data-tip="add new email template"
                >
                    <PlusCircleIcon className="w-6 h-6 text-base-100" />
                </div>
            </button>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 mt-10 p-4 font-body">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="p-4 bg-base-100 rounded-md shadow-lg"
                    >
                        <div className="flex flex-row justify-between gap-4 items-center">
                            <input
                                className="input input-ghost w-full p-2 mb-2 max-w-xs text-lg font-bold lg:text-xl font-display"
                                placeholder="Your template name"
                                value={template.name}
                                onChange={(e) =>
                                    handleInputChange(template.id, "name", e)
                                }
                            />
                            <select
                                className="select select-sm w-32 max-w-xs mb-4 bg-neutral"
                                value={template.language}
                                onChange={(e) =>
                                    handleInputChange(
                                        template.id,
                                        "language",
                                        e
                                    )
                                }
                            >
                                {languages.map((lang, index) => (
                                    <option key={index} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                            <div
                                className="btn btn-sm mb-4"
                                onClick={() =>
                                    handleDeleteTemplate(template.id)
                                }
                            >
                                <TrashIcon className="w-4 h-4" />
                            </div>
                        </div>

                        <textarea
                            className="textarea textarea-secondary w-full p-2 mb-4 resize-none"
                            placeholder="What should be your email about"
                            value={template.content}
                            onChange={(e) =>
                                handleInputChange(template.id, "content", e)
                            }
                        />
                        {template.response && (
                            <div
                                tabIndex={0}
                                className="collapse border border-base-300 bg-base-200 mb-4"
                            >
                                <div className="collapse-title text-lg font-normal">
                                    {template.response.split("\n").shift()}
                                </div>
                                <div className="collapse-content">
                                    <p>{template.response}</p>
                                </div>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="btn btn-primary btn-outline btn-md"
                            onClick={() => handleCreateEmail(template)}
                        >
                            {loading ? (
                                <>
                                    <span>I am writing</span>
                                    <span className="loading loading-dots loading-md"></span>
                                </>
                            ) : (
                                <span>Generate Email</span>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Emails;
