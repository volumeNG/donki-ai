import { config } from "@/config";
import removeMarkdown from "remove-markdown";
import { toast } from "sonner";

let audio: HTMLAudioElement | null = null;

const readAloud = async (
    text: string,
    setLoading: (loading: boolean) => void,
    setPlaying: (playing: boolean) => void,
    handleReCaptchaVerify: () => Promise<string | undefined>
) => {
    try {
        setLoading(true);

        if (audio && !audio.paused) {
            audio.pause();
            setPlaying(false);
            return; // Toggle pause if audio is currently playing
        }
        const token = await handleReCaptchaVerify();

        const response = await fetch(`${config.baseApi}/ai-config/get-audio`, {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: token as string },
            body: JSON.stringify({ text: removeMarkdown(text) }),
        });

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            audio = new Audio(audioUrl);
            audio
                .play()
                .then(() => setPlaying(true))
                .catch((error) => {
                    toast.error("Failed to play audio.");
                    console.error("Audio playback error:", error);
                });

            audio.onended = () => setPlaying(false); // Reset play state on end
        } else {
            toast.error("Failed to generate audio.");
        }
    } catch (error) {
        toast.error("Error generating audio.");
        console.error("Audio generation error:", error);
    } finally {
        setLoading(false);
    }
};

export default readAloud;
