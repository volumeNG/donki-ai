import { useEffect, useState } from "react";

import { useIncreaseUntruthfulMutation } from "@/redux/features/dashboard/dashboardApi";
import { addConversationMessage, deleteConversationMessages, IConversation } from "@/redux/features/openAi/openAiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Copy, LoaderCircle, PauseCircle, RefreshCcw, ThumbsDown, Volume2 } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

import copyToClipboard from "@/lib/handleCopy";
import readAloud from "@/lib/readText";
import scrollBottom from "@/lib/scrollBottom";
import useAppCaptcha from "@/hooks/useAppCaptcha";

import { AppDropdown } from "../ui/AppDropdown";
import { DonkiLogo } from "../ui/donki-logo";

type Props = {
    message: string;
    isLoading: boolean;
    handleSearched: (userQueryObj: { query: string; file?: File | null }, preConversions?: IConversation[]) => void;
    index: number;
    isError?: boolean;
};

const OpenAiAnswerBox = ({ message, isLoading, index, handleSearched, isError }: Props) => {
    const [increaseUntruthful] = useIncreaseUntruthfulMutation();
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const dispatch = useAppDispatch();
    const { handleReCaptchaVerify } = useAppCaptcha();
    const conversation = useAppSelector((state) => state.openAi.conversation);

    const handleSendUntruthful = async () => {
        if (!isFeedbackSubmitted) {
            await increaseUntruthful("")
                .unwrap()
                .then(() => {
                    toast.success("We received your feedback. Thank you for helping us improve!");
                    setIsFeedbackSubmitted(true);
                })
                .catch((res) => {
                    toast.error(res?.data?.message || "Something went wrong");
                });
        } else {
            toast.warning("You have already submitted your feedback. Thank you!");
        }
    };

    const handlePlayPauseAudio = () => {
        readAloud(message, setIsAudioLoading, setIsAudioPlaying, handleReCaptchaVerify);
    };

    const repliedDropdownItems = [
        {
            label: "Reseek",
            icon: <RefreshCcw size={20} />,
            onClick: () => {
                const findPrevious = conversation[index - 1];
                dispatch(deleteConversationMessages([index, index - 1]));
                dispatch(addConversationMessage({ content: findPrevious.content, role: "user" }));
                handleSearched({ query: findPrevious.content });
            },
        },
        {
            label: "Copy",
            icon: <Copy size={20} />,
            onClick: () => {
                copyToClipboard(message);
            },
        },
        {
            label: "Unfruitful",
            icon: <ThumbsDown size={20} />,
            onClick: handleSendUntruthful,
        },
        {
            label: isAudioPlaying ? "Pause" : "Proclaim",
            icon: isAudioLoading ? (
                <div className="amint animate-spin">
                    <LoaderCircle size={20} />
                </div>
            ) : isAudioPlaying ? (
                <PauseCircle size={20} />
            ) : (
                <Volume2 size={20} />
            ),
            onClick: isAudioLoading ? () => {} : handlePlayPauseAudio,
        },
    ];

    useEffect(() => {
        scrollBottom();
    }, [message]);

    return (
        <div className="flex items-start gap-3">
            <div className={isLoading ? "animate-pulse" : ""}>
                <DonkiLogo />
            </div>
            <div className={`${isError ? "text-red-600" : "text-foreground/80"} space-y-2`}>
                <Markdown
                    components={{
                        h1: ({ node, ...props }) => (
                            <h1 className="text-[32px] leading-[38px] font-medium mb-4" {...props} />
                        ),
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-medium mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-medium mb-2" {...props} />,
                        p: ({ node, ...props }) => (
                            <p className="text-sm lg:text-base font-medium leading-relaxed mb-4" {...props} />
                        ),
                        ul: ({ node, ...props }) => <ul className="list-disc ml-3 lg:ml-5 mb-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal ml-3 lg:ml-5 mb-4" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                        em: ({ node, ...props }) => <em className="italic" {...props} />,
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-4 border-gray-300 pl-3 md:pl-4 italic mb-4" {...props} />
                        ),
                        code: ({ node, ...props }) => (
                            <code className="bg-gray-100 text-red-600 rounded px-2 py-1 text-sm" {...props} />
                        ),
                        pre: ({ node, ...props }) => (
                            <pre className="bg-gray-900 text-white p-4 rounded mb-4 overflow-x-auto" {...props} />
                        ),
                    }}
                    remarkPlugins={[remarkGfm]}
                >
                    {message}
                </Markdown>
                {!isLoading && <AppDropdown dropdownItems={repliedDropdownItems} />}
            </div>
        </div>
    );
};

export default OpenAiAnswerBox;
