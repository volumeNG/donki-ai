"use client";

import { useEffect, useRef, useState } from "react";

import animationData from "@/assets/animation/data1.json";
import { AnimatePresence, motion } from "framer-motion";
import Player, { LottieRefCurrentProps } from "lottie-react";

import Navbar from "@/components/shared/Navbar";

export const metadata = {
    title: "theDonki.org - AI-Powered Bible Study & Research",
    description: "Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research. Search Bible passages, get answers, and explore Greek and Hebrew texts.",
    keywords: ["AI Bible study", "scriptural research", "faith", "theDonki.org"],
    openGraph: {
        title: "theDonki.org - AI-Powered Bible Study & Research",
        description: "Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research.",
        url: "https://thedonki.org/",
        images: [
            {
                url: "https://thedonki.org/images/logo.jpg",
                alt: "theDonki.org Logo",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "theDonki.org - AI-Powered Bible Study & Research",
        description: "Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research.",
        images: ["https://thedonki.org/images/logo.jpg"],
    },
};


const HomeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [animationComplete, setAnimationComplete] = useState(false);
    const lottieRef = useRef(null);

    // useEffect
    useEffect(() => {
        if (lottieRef.current) {
            (lottieRef.current as LottieRefCurrentProps).setSpeed(1.5);
        }
    }, []);

    return (
        <div className={` `}>
            <AnimatePresence mode="wait">
                {/* If the animation is not complete, show the animation with smooth transition */}
                {!animationComplete && (
                    <motion.div
                        className="flex h-screen   justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        key={"1"}
                    >
                        <Player
                            autoplay
                            loop={false}
                            animationData={animationData}
                            className="w-full lg:w-1/2"
                            lottieRef={lottieRef}
                            onComplete={() => {
                                setAnimationComplete(true); // Set state to true after animation completes
                            }}
                        />
                    </motion.div>
                )}
                {animationComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={"2"}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-[#121212] z-50">
                            <Navbar />
                        </div>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeLayout;
