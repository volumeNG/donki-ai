import React, { useState } from "react";

const OpenAIStreamingComponent: React.FC = () => {
    const [conversation, setConversation] = useState([{ role: "user", content: "can you tell me about banglaesh" }]); // This can be dynamically set based on user input
    const [response, setResponse] = useState<string>(""); // Holds the response stream

    const handleStreamRequest = async () => {
        setResponse(""); // Clear previous response

        const url = "http://localhost:5001/api/v1/ai-config/asked"; // Your API endpoint

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4", // You can dynamically set the model
                    conversation: conversation, // Your conversation messages
                }),
            });

            if (!res.body) throw new Error("ReadableStream not supported!");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            let result = ""; // Store the response incrementally
            const readStream = async () => {
                const { done, value } = await reader.read();
                if (done) {
                    console.log("Stream complete");
                    return;
                }

                // Decode the stream data
                const chunk = decoder.decode(value, { stream: true });
                result += chunk; // Append the chunk to the result

                setResponse((prev) => prev + chunk); // Update the state with the new chunk

                readStream(); // Continue reading the stream
            };

            readStream();
        } catch (err) {
            console.error("Error during fetch:", err);
        }
    };

    return (
        <div>
            <h1>OpenAI Streaming Response</h1>
            <button onClick={handleStreamRequest}>Start Stream</button>

            <div>
                <h2>Response:</h2>
                <pre>{response}</pre> {/* Display the response incrementally */}
            </div>
        </div>
    );
};

export default OpenAIStreamingComponent;
