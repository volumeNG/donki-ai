"use client";

import Image from "next/image";

import donkiLogoWhite from "@/assets/svg/logo-white.svg";
import donkiLogo from "@/assets/svg/logo.svg";
import { useTheme } from "next-themes";

const DonkiLogo = () => {
    const { theme } = useTheme();

    return (
        <div className="flex select-none aspect-square min-w-9 size-9 md:size-12 md:min-w-12 items-center justify-center rounded-full border border-border bg-secondary">
            <Image className="max-sm:size-5" src={theme === "dark" ? donkiLogoWhite : donkiLogo} alt="danki logo" />
        </div>
    );
};

export { DonkiLogo };
