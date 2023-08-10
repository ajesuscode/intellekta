// use client;
import React, { useState, ReactElement } from "react";

// Assuming these are React components, you can import them as such. If the MDX compiler is set up correctly, it should handle them just fine.
import TranslatorDoc from "./translatorDoc.mdx";
import TutorDoc from "./tutorDoc.mdx";
import EmailDoc from "./emailDoc.mdx";

const Docs: React.FC = () => {
    // You can define the type for the state as either ReactElement (from React) or null.
    const [currentDoc, setCurrentDoc] = useState<ReactElement | null>(null);

    const handleDocClick = (docName: string) => {
        switch (docName) {
            case "translator":
                setCurrentDoc(<TranslatorDoc />);
                break;
            case "tutor":
                setCurrentDoc(<TutorDoc />);
                break;
            case "email":
                setCurrentDoc(<EmailDoc />);
                break;
            default:
                setCurrentDoc(null);
        }
    };

    return (
        <div className="h-full flex flex-row justify-between pt-12 gap-8">
            <div>
                <h2 className="lg:text-lg font-body uppercase text-secondary pb-6 text-sm">
                    Intellekta tools documentation
                </h2>
                <ul className="pb-8">
                    <li className="pb-2">
                        <button onClick={() => handleDocClick("translator")}>
                            Translator
                        </button>
                    </li>
                    <li className="pb-2">
                        <button onClick={() => handleDocClick("email")}>
                            Email
                        </button>
                    </li>
                    <li className="pb-2">
                        <button onClick={() => handleDocClick("tutor")}>
                            Tutor
                        </button>
                    </li>
                </ul>
            </div>

            <div className="h-full overflow-y-auto font-body">{currentDoc}</div>
        </div>
    );
};

export default Docs;
