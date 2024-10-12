import { useCallback, useEffect, useState } from "react";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const useAppCaptcha = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        setLoading(true);
        try {
            const token = await executeRecaptcha("yourAction");
            setToken(token); // Set the token
        } catch (error) {
            console.error("ReCaptcha verification failed", error);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    }, [executeRecaptcha]);

    useEffect(() => {
        handleReCaptchaVerify(); // Optionally trigger on component mount
    }, [handleReCaptchaVerify]);

    return { token, loading, handleReCaptchaVerify };
};

export default useAppCaptcha;
