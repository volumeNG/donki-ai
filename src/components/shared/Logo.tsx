"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/svg/logo.svg";

import { cn } from "@/lib/utils";

const Logo = ({ className, imageSize }: { imageSize?: number; className?: string }) => {
    const [imageWidth, setImageWidth] = useState<number>(imageSize || 40);

    const updateImageSize = () => {
        if (window.innerWidth < 667) {
            if (imageSize && imageSize > 100) {
                setImageWidth(40);
            } else {
                setImageWidth(25);
            }
        } else {
            setImageWidth(imageSize || 40);
        }
    };

    useEffect(() => {
        // Set the initial image size
        updateImageSize();

        // Listen for window resize events
        window.addEventListener("resize", updateImageSize);

        // Clean up event listener when the component is unmounted
        return () => window.removeEventListener("resize", updateImageSize);
    }, []);

    return (
        <Link href="/" className={cn("flex items-center text-xl md:text-3xl", className)}>
            <span className={cn("font-extrabold text-foreground/80")}>theDonki</span>
            <Image src={logo} alt="Donki Logo" width={imageWidth} height={imageWidth} />
        </Link>
    );
};

export default Logo;
