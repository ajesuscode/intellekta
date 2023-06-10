"use client";
import React, { ChangeEvent, useCallback, useState, useEffect } from "react";

interface Template {
    id: number;
    name: string;
    style: string;
    content: string;
    response?: string;
}

const AddTemplateButton: React.FC = () => {
    const [templates, setTemplates] = useState<Template[]>(() => {
        // Load templates from localStorage when the component mounts
        const savedTemplates = localStorage.getItem("templates");
        return savedTemplates ? JSON.parse(savedTemplates) : [];
    });

    useEffect(() => {
        // Save templates to localStorage whenever they change
        localStorage.setItem("templates", JSON.stringify(templates));
    }, [templates]);

    const handleAddTemplate = useCallback(() => {
        const newTemplate: Template = {
            id: Date.now(),
            name: "",
            style: "",
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
            const response = await fetch("api/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: template.id,
                    style: template.style,
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
        } catch (error) {
            console.error("Failed to create email:", error);
        }
    }, []);

    console.log(templates);

    return (
        <div className="relative flex flex-col min-h-screen bg-base-200/50 rounded-lg p-4">
            <button
                className="px-4 py-2 btn btn-secondary btn-sm fixed lg:top-16 lg:right-16 m-4 top-10 right-6"
                onClick={handleAddTemplate}
            >
                Add Email Template
            </button>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 mt-10">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="p-4 bg-base-100 rounded-md shadow-lg"
                    >
                        <div className="flex flex-row justify-between gap-4">
                            <input
                                className="input input-ghost w-full p-2 mb-2 max-w-xs text-xl font-bold"
                                placeholder="Enter your template name"
                                value={template.name}
                                onChange={(e) =>
                                    handleInputChange(template.id, "name", e)
                                }
                            />
                            <select
                                className="select w-32 max-w-xs p-2 mb-4 bg-neutral"
                                value={template.style}
                                onChange={(e) =>
                                    handleInputChange(template.id, "style", e)
                                }
                            >
                                <option value="">Email Style</option>
                                <option value="formal">Formal</option>
                                <option value="friendly">Friendly</option>
                                {/* Add more styles as needed */}
                            </select>
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
                            <p className="pb-6 text-base">
                                {template.response}
                            </p>
                        )}
                        <button
                            className="btn btn-primary btn-outline btn-md"
                            onClick={() => handleCreateEmail(template)}
                        >
                            Generate Email
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddTemplateButton;
