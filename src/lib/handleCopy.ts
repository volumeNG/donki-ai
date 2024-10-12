import removeMarkdown from "remove-markdown";

// export const copyToClipboard = (text: string): void => {
//     let plainText = removeMarkdown(text);
//     copy(plainText);
// };
export const copyToClipboard = async (text: string): Promise<boolean> => {
    const plainText = removeMarkdown(text);
    try {
        await navigator.clipboard.writeText(plainText);
        return true;
    } catch (err) {
        return false;
    }
};
export default copyToClipboard;
