import React, { useState } from "react";

import { addConversationMessage, deleteConversationMessages, IConversation } from "@/redux/features/openAi/openAiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Copy, PencilLine } from "lucide-react";

import copyToClipboard from "@/lib/handleCopy";

import { AppDropdown } from "../ui/AppDropdown";

type Props = {
    message: string;
    handleSearched: (userQueryObj: { query: string; file?: File | null }, preConversions?: IConversation[]) => void;
    index: number;
    isLoading: boolean;
};

const UserQueryBox = ({ message, index, handleSearched, isLoading }: Props) => {
    const [isEnableEdit, setIsEnableEdit] = useState(false);
    const [editedMessage, setEditedMessage] = useState(message);
    const conversation = useAppSelector((state) => state.openAi.conversation);
    const dispatch = useAppDispatch();
    const askDropdownItems = [
        {
            label: "Copy",
            icon: <Copy size={20} />,
            onClick: () => {
                copyToClipboard(message);
            },
        },
        {
            label: "Edit",
            icon: <PencilLine size={20} />,
            onClick: () => {
                setIsEnableEdit(true);
            },
        },
    ];
    return (
        <div className="mt-5">
            {/* User's question */}
            {
                isEnableEdit && !isLoading ? (
                    <div className="flex justify-end mb-8">
                        <div className="px-3 text-sm w-full max-w-[700px]  border border-gray-300 rounded-xl shadow-sm py-3">
                            <textarea
                                value={editedMessage}
                                className="resize-none   w-full outline-none hover:outline-none focus:outline-none h-12 px-3 text-sm    rounded-md"
                                onChange={(e) => {
                                    // setIsEnableEdit(false);
                                    setEditedMessage(e.target.value);
                                    // handleSearched({ query: e.target.value });
                                }}
                            />
                            <div className="flex justify-end items-center  ">
                                <button
                                    className="bg-secondary dark:text-gray-200 text-black/60 px-2 md:px-3  py-1 md:py-2 rounded-full  font-bold cursor-pointer text-xs md:text-md "
                                    onClick={() => setIsEnableEdit(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isLoading}
                                    onClick={() => {
                                        if (!isLoading) {
                                            dispatch(deleteConversationMessages([index, index + 1]));
                                            dispatch(addConversationMessage({ content: editedMessage, role: "user" }));
                                            handleSearched({ query: editedMessage });
                                            setIsEnableEdit(false);
                                        }
                                    }}
                                    className="bg-primary ml-2 px-2 md:px-3  py-1 md:py-2  text-xs md:text-md rounded-full text-white font-bold cursor-pointer "
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 flex items-center justify-end gap-3">
                        <div className="min-w-9">
                            <AppDropdown dropdownItems={askDropdownItems} />
                        </div>
                        <span className="rounded-2xl md:rounded-full bg-secondary px-3 text-sm   lg:text-md  lg:px-5 py-2 lg:py-3 text-foreground/80">
                            {message}
                        </span>
                    </div>
                )
                // Render the user's question with the dropdown menu if it's not being edited.
            }
        </div>
    );
};

export default UserQueryBox;
