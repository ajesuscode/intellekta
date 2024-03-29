export type IconProps = {
    size?: number;
    color?: string;
};
export const TranslatorIcon = ({ size, color }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 640 512"
            xmlns="http://www.w3.org/2000/svg"
            className={color}
        >
            <path
                fill="currentColor"
                d="M0 128c0-35.3 28.7-64 64-64h512c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm320 0v256h256V128H320zm-141.7 47.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1.1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2l19 42.8h-38l19-42.8zM448 164c11 0 20 9 20 20v4h60c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9.6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9L467 333.8c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8L410 286.1c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6l.5.5c12.4-13.1 22.5-28.3 29.8-45H376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z"
            ></path>
        </svg>
    );
};

export const ChatIcon = ({ size, color }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className={color}
        >
            <path
                fill="currentColor"
                d="M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20a19.92 19.92 0 0 1-9.534-2.414l-8.235 2.342c-1.319.375-2.537-.844-2.162-2.162l2.342-8.238A19.917 19.917 0 0 1 4 24Zm12-3.75c0 .69.56 1.25 1.25 1.25h13.5a1.25 1.25 0 1 0 0-2.5h-13.5c-.69 0-1.25.56-1.25 1.25Zm1.25 6.25a1.25 1.25 0 1 0 0 2.5h9.5a1.25 1.25 0 1 0 0-2.5h-9.5Z"
            ></path>
        </svg>
    );
};

export const EmailIcon = ({ size, color }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className={color}
        >
            <path
                fill="currentColor"
                d="M19 14.5v-9c0-.83-.67-1.5-1.5-1.5H3.49c-.83 0-1.5.67-1.5 1.5v9c0 .83.67 1.5 1.5 1.5H17.5c.83 0 1.5-.67 1.5-1.5zm-1.31-9.11c.33.33.15.67-.03.84L13.6 9.95l3.9 4.06c.12.14.2.36.06.51c-.13.16-.43.15-.56.05l-4.37-3.73l-2.14 1.95l-2.13-1.95l-4.37 3.73c-.13.1-.43.11-.56-.05c-.14-.15-.06-.37.06-.51l3.9-4.06l-4.06-3.72c-.18-.17-.36-.51-.03-.84s.67-.17.95.07l6.24 5.04l6.25-5.04c.28-.24.62-.4.95-.07z"
            ></path>
        </svg>
    );
};

export const ExperimetnsIcon = ({ size, color }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className={color}
        >
            <mask id="ipSExperimentOne0">
                <g
                    fill="currentColor"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="4"
                >
                    <path d="m10.777 30l7.242-14.961V4h12.01v11.039L37.245 30"></path>
                    <path
                        fill="currentColor"
                        d="M7.794 43.673a3.273 3.273 0 0 1-1.52-4.372L10.777 30S18 35 24 30c6-5 13.246 0 13.246 0l4.49 9.305A3.273 3.273 0 0 1 38.787 44H9.22c-.494 0-.981-.112-1.426-.327Z"
                    ></path>
                </g>
            </mask>
            <path
                fill="currentColor"
                d="M0 0h48v48H0z"
                mask="url(#ipSExperimentOne0)"
            ></path>
        </svg>
    );
};

export const TutorIcon = ({ size, color }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={color}
        >
            <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z"></path>
                <path
                    fill="currentColor"
                    d="M9 3a4 4 0 0 0-4 4v1.126a4.002 4.002 0 0 0 0 7.748V17a4 4 0 0 0 7 2.646A4 4 0 0 0 19 17v-1.126a4.002 4.002 0 0 0 0-7.748V7a4 4 0 0 0-7-2.646A3.99 3.99 0 0 0 9 3Zm8 6V7a2 2 0 1 0-4 0v4.535A3.982 3.982 0 0 1 15 11a1 1 0 1 1 0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0v-1.126a3.947 3.947 0 0 1-.333-.102a1 1 0 1 1 .666-1.886A2 2 0 1 0 18 10a1 1 0 0 1-1-1Zm-8 4a2 2 0 0 1 2 2v2a2 2 0 1 1-4 0v-1.126c.113-.03.224-.063.333-.102a1 1 0 1 0-.666-1.886A2 2 0 1 1 6 10a1 1 0 0 0 1-1V7a2 2 0 1 1 4 0v4.535A3.982 3.982 0 0 0 9 11a1 1 0 1 0 0 2Z"
                ></path>
            </g>
        </svg>
    );
};

export const TerminalIcon = ({ size, color }: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={color}
        >
            <path
                fill="currentColor"
                d="M2 4v16h20V4H2zm18 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4l-4 4z"
            />
        </svg>
    );
};
