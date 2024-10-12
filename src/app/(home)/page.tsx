"use client";

import React, { useEffect, useState } from "react";

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
    // const [isSearching, setIsSearching] = useState(false);
    // const [conversation, setConversation] = useState([]); // Tracks the conversation
    // const [response, setResponse] = useState(""); // Stores the AI's response
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
        // Add event listener to handle window resizing
        window.addEventListener("resize", handleAddSize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleAddSize);
        };
    }, []);
    return (
        <div className={`mx-auto   max-sm:px-4 md:max-w-[70%]`} style={{ paddingTop: topPadding + "px" }}>
            <div className={`  transition-all duration-700`}>
                <AnimatePresence>
                    {isSearching ? (
                        <motion.div
                            key={"1"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.7 } }}
                            exit={{ opacity: 0 }}
                            className="pb-[130px] pr-2 max-w-4xl 2xl:max-w-6xl mx-auto"
                        >
                            {/* AI's response */}
                            {conversation.map((single, i) => (
                                <>
                                    {single.role === "user" ? (
                                        <UserQueryBox
                                            key={i}
                                            handleSearched={handleSearched}
                                            index={i}
                                            isLoading={isLoading}
                                            message={single.content}
                                        ></UserQueryBox>
                                    ) : (
                                        <OpenAiAnswerBox
                                            handleSearched={handleSearched}
                                            isLoading={isLoading}
                                            message={single.content}
                                            key={i}
                                            index={i}
                                        ></OpenAiAnswerBox>
                                    )}
                                </>
                            ))}
                            {isLoading ? (
                                <OpenAiAnswerBox
                                    handleSearched={handleSearched}
                                    isLoading={isLoading}
                                    message={response}
                                    index={conversation.length}
                                ></OpenAiAnswerBox>
                            ) : null}
                            {isError ? (
                                <OpenAiAnswerBox
                                    isError={true}
                                    handleSearched={handleSearched}
                                    isLoading={isLoading}
                                    message={response}
                                    index={conversation.length}
                                ></OpenAiAnswerBox>
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
            {/* 2xl:bottom-1/3 md:bottom-1/2 xl:bottom-[25%] bottom-[calc(100vh-500px)] */}
            <div
                className={`flex  transition-all duration-500 items-center    fixed  justify-center w-full left-0 right-0 bottom-0 px-2 bg-white dark:bg-[#121212]  ${isSearching ? "bottom-0 delay-150 transldate-y-0" : "bottom-1/2 translate-y-1/2"}`}
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

                    <div className=" mx-auto max-w-4xl 2xl:max-w-6xl w-full">
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
                                    className="flex xl:grid   xl:grid-cols-4 gap-3 no-scrollbar w-full overflow-x-scroll overflow-y-clip xl:overflow-clip"
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
                                                dispatch(
                                                    addConversationMessage({ content: prompt.prompt, role: "user" })
                                                );
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
    );
};

export default HomePage;
