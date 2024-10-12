"use client";

import * as React from "react";

import { config } from "@/config";
import { store } from "@/redux/app/store";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Provider } from "react-redux";

import { Toaster } from "../ui/sonner";

type TProviders = {
    children: React.ReactNode;
};

const Providers = ({ children }: TProviders) => {
    return (
        <Provider store={store}>
            <GoogleReCaptchaProvider
                container={{ parameters: { badge: "inline" } }}
                reCaptchaKey={config.captchaSiteKey as string}
            >
                {children} <Toaster />
            </GoogleReCaptchaProvider>
        </Provider>
    );
};

export default Providers;
