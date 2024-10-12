import removeMarkdown from "remove-markdown";

// const loadVoices = () => {
//     const availableVoices = window.speechSynthesis.getVoices();
//     // setVoices(availableVoices);

//     // Set a default voice (you can choose one that resembles ChatGPT)
//     const defaultVoice = availableVoices.find((voice) => voice.name.includes("Google US English")); // Change as
//     return availableVoices;
// };
// Function to read text aloud
const readAloud = (text: string) => {
    const plainText = removeMarkdown(text);

    const speech = new SpeechSynthesisUtterance(plainText);
    window.speechSynthesis.speak(speech);
};
export default readAloud;
