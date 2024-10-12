"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authKey } from "@/constants/storageKey";
import { useAppSelector } from "@/redux/hook";

import { getFromLocalStorage } from "@/lib/local-storage";

const PrivateLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();

    const accessToken = useAppSelector((state) => state.auth.accessToken);

    useEffect(() => {
        if (!accessToken) {
            const redirectTo = `/auth/login`;
            router.push(redirectTo);
        }
    }, [accessToken, router]);

    if (!accessToken) {
        return null;
    }

    return <>{children}</>;
};

export default PrivateLayout;
