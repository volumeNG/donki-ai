import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import sendImage from "@/assets/image/send.png";
import { CircleX, File, Paperclip } from "lucide-react";

type TSearchBar = {
    isWriting?: boolean;
    onSend: (message: string, file?: File | null) => void; // Update to accept file as optional param
    handleStop: () => void;
};

const SearchBar = ({ isWriting = false, onSend, handleStop }: TSearchBar) => {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for storing the selected file
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the file input

    const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const input = e.target as HTMLTextAreaElement;
        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
        setInput(input.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file); // Save the selected file
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isWriting) {
                if (input.trim()) {
                    onSend(input, selectedFile); // Pass the file along with the message
                    setInput("");
                    setSelectedFile(null); // Reset the file after sending
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ""; // Clear the file input field
                    }
                    const textarea = e.target as HTMLTextAreaElement;
                    textarea.style.height = "auto";
                }
            }
        }
    };

    const handleSendClick = () => {
        if (input.trim()) {
            onSend(input, selectedFile); // Pass the file when clicking send
            setInput("");
            setSelectedFile(null); // Reset the file after sending
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear the file input field
            }
        }
    };

    return (
        <>
            <div className="mb-3 px-6  flex w-full justify-center items-center gap-1.5 md:gap-2 max-sm:px-2">
                <div className="flex w-full items-end justify-start gap-2 rounded-2xl lg:rounded-[26px] border border-border px-3 md:px-5 py-2 md:py-4 bg-secondary">
                    <label htmlFor="file-upload">
                        <Paperclip className="cursor-pointer text-primary max-sm:size-5" />
                    </label>
                    <input
                        id="file-upload"
                        ref={fileInputRef} // Use the ref here
                        type="file"
                        accept="application/pdf" // Restrict to PDFs only
                        style={{ display: "none" }} // Hidden input element
                        onChange={handleFileChange}
                    />
                    <div className="flex flex-col w-full justify-end">
                        {selectedFile && (
                            <div className="flex mb-2 bg-border px-3 py-1 rounded  items-center gap-2 max-w-[250px]">
                                <div className="size-[30px] bg-primary rounded flex justify-center items-center">
                                    <File className="text-white" />
                                </div>
                                <div className="text-sm flex items-center w-full justify-between">
                                    <div className="w-full">
                                        <span>{selectedFile.name}</span>
                                        <br />
                                        <span>Pdf</span>
                                    </div>

                                    <div className="min-w-[20px] ml-2">
                                        <button
                                            className="cursor-pointer text-foreground-secondary"
                                            onClick={() => setSelectedFile(null)}
                                        >
                                            <CircleX />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Message TheDonki"
                            rows={1}
                            className="w-full  max-sm:text-sm outline-none bg-transparent resize-none max-h-60 overflow-y-auto"
                        />
                    </div>
                </div>

                {isWriting ? (
                    <button
                        onClick={handleStop}
                        className="cursor-pointer rounded-full border border-secondary bg-foreground/10 p-2 md:p-3"
                    >
                        <span className="block size-2 md:size-3 bg-primary"></span>
                    </button>
                ) : (
                    <button
                        onClick={handleSendClick}
                        className="cursor-pointer mt-auto mb-1 lg:mb-3 max-sm:w-8 transition-all active:scale-95"
                    >
                        <Image
                            className="cursor-pointer block max-sm:min-w-8 max-sm:h-8"
                            src={sendImage}
                            alt="send prompt"
                            width={40}
                            height={40}
                        />
                    </button>
                )}
            </div>
            <div className="mb-3 md:mb-9">
                <p className=" text-center text-[10px] md:text-sm font-medium text-foreground/60">
                    This platform is supported by voluntary donations. <br className="md:hidden" />
                    <Link href={"/donate-us"} className="text-primary">
                        Please support our work.
                    </Link>
                </p>
                {/* <small className="text-center  inline-block text-[9px] lg:w-full w-[300px]">
                    This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy" className="text-primary">
                        Privacy Policy
                    </a>{" "}
                    and
                    <a href="https://policies.google.com/terms" className="text-primary">
                        Terms of Service
                    </a>{" "}
                    apply.
                </small> */}
            </div>
        </>
    );
};

export default SearchBar;
