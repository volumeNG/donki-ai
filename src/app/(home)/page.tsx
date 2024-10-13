"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head"; // Import the Head component

import { addConversationMessage } from "@/redux/features/openAi/openAiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { AnimatePresence, motion } from "framer-motion";

import scrollBottom from "@/lib/scrollBottom";
import useSearchTopOpenAi from "@/hooks/useSearchToOpenAi";
import OpenAiAnswerBox from "@/components/home/OpenAiAnswerBox";
import SearchBar from "@/components/home/SearchBar";
import UserQueryBox from "@/components/home/UserQueryBox";
import Logo from "@/components/shared/Logo";

const HomePage = () => {
    const { response, handleSearched, isLoading, handleStop } = useSearchTopOpenAi();
    const { conversation, isError } = useAppSelector((state) => state.openAi);
    const dispatch = useAppDispatch();
    const [topPadding, setTopPadding] = useState(100);
    const isSearching = Boolean(conversation.length);
    const prompts = [
        {
            prompt: `What does Balaam’s story in Numbers 22:21-35 teach about God's guidance?`,
        },
        {
            prompt: `Can you show me the original Hebrew or Greek text of a specific Bible verse?`,
        },
        {
            prompt: `How does the Bible encourage believers to use technology for God’s glory?`,
        },
        {
            prompt: `According to God's teachings, to inherit eternal life and live forever in His presence?`,
        },
    ];

    const container = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                ease: "linear",
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20, transition: { duration: 0.1 } },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "linear",
            },
        },
    };

    useEffect(() => {
        const handleAddSize = () => {
            const value = document.getElementById("navbar")?.getBoundingClientRect().height;
            if (window.innerWidth <= 500) {
                setTopPadding(value ? value + 20 : 130);
            } else if (window.innerWidth <= 1080) {
                setTopPadding(70);
            } else {
                setTopPadding(130);
            }
        };
        handleAddSize();
        window.addEventListener("resize", handleAddSize);
        return () => {
            window.removeEventListener("resize", handleAddSize);
        };
    }, []);

    return (
        <>
            {/* Add SEO metadata */}
            <Head>
                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-TQYKHHKY25"></script>
                <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-TQYKHHKY25');
                    `,
                }}
                />

                {/* SEO */}
                <title>theDonki.org - AI-Powered Bible Study & Scriptural Research</title>
                <meta
                name="description"
                content="Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research. Search Bible passages, get answers, and explore Greek and Hebrew texts. Powered by technology to enhance your understanding of God’s Word."
                />

                {/* Open Graph Meta Tags for Social Media */}
                <meta property="og:title" content="theDonki.org - AI-Powered Bible Study & Scriptural Research" />
                <meta property="og:description" content="Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research." />
                <meta property="og:image" content="https://thedonki.org/images/logo.jpg" /> {/* Replace with your image URL */}
                <meta property="og:url" content="https://thedonki.org" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="theDonki.org - AI-Powered Bible Study & Scriptural Research" />
                <meta name="twitter:description" content="Experience theDonki.org, the revolutionary AI-powered platform for Bible study and scriptural research." />
                <meta name="twitter:image" content="https://thedonki.org/images/logo.jpg" /> {/* Replace with your image URL */}
            </Head>

            {/* Page content */}
            <div className={`mx-auto  max-sm:px-4 md:max-w-[70%]`} style={{ paddingTop: topPadding + "px" }}>
                <div className={`transition-all duration-700`}>
                    <AnimatePresence>
                        {isSearching ? (
                            <motion.div
                                key={"1"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.7 } }}
                                exit={{ opacity: 0 }}
                                className="pb-[130px] pr-2 max-w-4xl 2xl:max-w-6xl mx-auto"
                            >
                                {conversation.map((single, i) => (
                                    <>
                                        {single.role === "user" ? (
                                            <UserQueryBox
                                                key={i}
                                                handleSearched={handleSearched}
                                                index={i}
                                                isLoading={isLoading}
                                                message={single.content}
                                            />
                                        ) : (
                                            <OpenAiAnswerBox
                                                handleSearched={handleSearched}
                                                isLoading={isLoading}
                                                message={single.content}
                                                key={i}
                                                index={i}
                                            />
                                        )}
                                    </>
                                ))}
                                {isLoading ? (
                                    <OpenAiAnswerBox
                                        handleSearched={handleSearched}
                                        isLoading={isLoading}
                                        message={response}
                                        index={conversation.length}
                                    />
                                ) : null}
                                {isError ? (
                                    <OpenAiAnswerBox
                                        isError={true}
                                        handleSearched={handleSearched}
                                        isLoading={isLoading}
                                        message={response}
                                        index={conversation.length}
                                    />
                                ) : null}
                            </motion.div>
                        ) : (
                            <motion.div
                                key={"2"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                                exit={{ opacity: 0, transition: {} }}
                                className="mt-20 md:mt-[20px] xl:mt-20 2xl:mt-28"
                            >
                                <Logo className="mx-auto hidden md:mb-20 w-fit text-5xl md:text-8xl" imageSize={108} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div
                    className={`flex  transition-all duration-500 items-center fixed justify-center w-full left-0 right-0 bottom-0 px-2 bg-white dark:bg-[#121212] ${
                        isSearching ? "bottom-0 delay-150 transldate-y-0" : "bottom-1/2 translate-y-1/2"
                    }`}
                >
                    <div className="w-full">
                        {!isSearching && (
                            <motion.div
                                key={"2"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                                exit={{ opacity: 0, transition: {} }}
                                className=" "
                            >
                                <Logo className="mx-auto  mb-4 2xl:mb-20 w-fit text-5xl md:text-8xl" imageSize={108} />
                            </motion.div>
                        )}

                        <div className="mx-auto max-w-[850px] 2xl:max-w-6xl w-full">
                            <SearchBar
                                onSend={(value, file) => {
                                    handleSearched({ query: value, file }, conversation);
                                    dispatch(addConversationMessage({ content: value, role: "user" }));
                                    scrollBottom();
                                }}
                                isWriting={isLoading}
                                handleStop={handleStop}
                            />
                            <AnimatePresence>
                                {!isSearching && (
                                    <motion.div
                                        className="flex xl:grid xl:grid-cols-4 gap-3 no-scrollbar w-full overflow-x-scroll overflow-y-clip xl:overflow-clip"
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                        exit={"hidden"}
                                    >
                                        {prompts?.map((prompt, index) => (
                                            <motion.div
                                                key={index}
                                                variants={item}
                                                className="cursor-pointer rounded-2xl border min-w-[200px] border-border p-3 md:p-5 hover:bg-background"
                                                onClick={() => {
                                                    handleSearched({ query: prompt.prompt }, conversation);
                                                    dispatch(addConversationMessage({ content: prompt.prompt, role: "user" }));
                                                }}
                                            >
                                                <h1 className="text-sm text-foreground/80 ">“{prompt.prompt}”</h1>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
