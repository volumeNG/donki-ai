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
        setToken(null); // Clear any previous token

        try {
            const newToken = await executeRecaptcha("yourAction");

            setToken(newToken); // Set the new token
            return newToken;
        } catch (error) {
            console.error("ReCaptcha verification failed", error);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    }, [executeRecaptcha]);

    // Optional: automatically re-run when executeRecaptcha becomes available
    useEffect(() => {
        if (executeRecaptcha) {
            handleReCaptchaVerify();
        }
    }, [executeRecaptcha, handleReCaptchaVerify]);

    return { token, loading, handleReCaptchaVerify };
};

export default useAppCaptcha;
