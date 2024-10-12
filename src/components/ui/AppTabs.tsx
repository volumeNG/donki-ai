import { Dispatch, SetStateAction } from "react";

import { AnimatePresence, motion } from "framer-motion";

type TAppTabs = {
    tabs: {
        label: string;
        value?: string;
    }[];
    className?: string;
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
};

const AppTabs = ({ className, tabs, activeTab, setActiveTab }: TAppTabs) => {
    return (
        <AnimatePresence>
            <div className={`flex gap-2 border-b border-b-border w-full justify-center md:gap-8`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.value ? tab.value : tab.label)}
                        className={`${
                            activeTab === (tab.value ? tab.value : tab.label)
                                ? "font-medium text-primary"
                                : "text-foreground/50 hover:text-primary"
                        } relative px-2 py-1 transition md:py-1.5 text-sm lg:text-lg ${className}`}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        {activeTab === (tab.value ? tab.value : tab.label) && (
                            <motion.span
                                layoutId="bubble"
                                className={`absolute inset-0 z-10 border-b border-b-primary md:border-b-[3px]`}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab.label}
                    </button>
                ))}
            </div>
        </AnimatePresence>
    );
};
export default AppTabs;
