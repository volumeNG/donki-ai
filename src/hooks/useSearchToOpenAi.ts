import { useRef, useState } from "react";

import { config } from "@/config";
import { addConversationMessage, IConversation, setIsError } from "@/redux/features/openAi/openAiSlice";
import { useAppDispatch } from "@/redux/hook";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";

import scrollBottom from "@/lib/scrollBottom";

import useAppCaptcha from "./useAppCaptcha";

const useSearchTopOpenAi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);
    const [response, setResponse] = useState<string>("");
    const dispatch = useAppDispatch();
    const { handleReCaptchaVerify } = useAppCaptcha();

    // Ref to track if the stream should stop
    const isStoppedRef = useRef(false);

    // Function to handle stopping the stream
    const handleStop = () => {
        isStoppedRef.current = true;
        setIsLoading(false);
    };

    const handleSearched = async (
        userQueryObj: { query: string; file?: File | null },
        preConversions?: IConversation[]
    ) => {
        const { query, file } = userQueryObj; // Destructure the userQueryObj

        setIsLoading(true);
        isStoppedRef.current = false; // Reset the stop flag before starting a new query
        setResponse("");
        setConversation((prev) => [...prev, { role: "user", content: query }]);

        try {
            dispatch(setIsError(false));

            const token = await handleReCaptchaVerify();
            // Create FormData to handle both text and file data
            const formData = new FormData();
            formData.append(
                "conversation",
                JSON.stringify(
                    preConversions
                        ? [...preConversions, { role: "user", content: query }]
                        : [{ role: "user", content: query }]
                )
            );

            // If there's a file, append it to the formData
            if (file) {
                formData.append("pdf", file);
            }

            // Make the API request to get the streaming response
            const responseStream = await fetch(`${config.baseApi}/ai-config/asked`, {
                method: "POST",
                body: formData, // Send the FormData object (no need to set Content-Type, browser does it automatically)
                headers: {
                    authorization: token as string,
                },
            });
            if (!responseStream.ok) {
                const errorText = await responseStream.text(); // Read the error message from the body
                throw new Error(`Error ${responseStream.status}: ${errorText}`);
            }
            if (!responseStream.body) throw new Error("Stream not supported");

            const reader = responseStream.body.getReader();
            const decoder = new TextDecoder();
            let aiResponse = "";

            const processStream = async () => {
                if (isStoppedRef.current) {
                    reader.cancel(); // Cancel reading the stream if stopped
                    setConversation((prev) => [...prev, { role: "assistant", content: aiResponse }]);
                    dispatch(addConversationMessage({ role: "assistant", content: aiResponse }));
                    setIsLoading(false);
                    scrollBottom();
                    return;
                }

                const { done, value } = await reader.read();
                if (done) {
                    setConversation((prev) => [...prev, { role: "assistant", content: aiResponse }]);
                    dispatch(addConversationMessage({ role: "assistant", content: aiResponse }));
                    setIsLoading(false);
                    scrollBottom();
                    return;
                }

                const chunk = decoder.decode(value, { stream: true });
                aiResponse += chunk;
                setResponse((prev) => prev + chunk);
                scrollBottom();

                processStream();
            };

            processStream();
        } catch (err) {
            console.error("Error fetching stream:", err);
            setResponse("Please try again later"); // Set a friendly error message
            dispatch(setIsError(true));
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        conversation,
        response,
        handleSearched,
        handleStop, // Return the stop function to be used elsewhere
    };
};

export default useSearchTopOpenAi;
