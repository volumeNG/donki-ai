"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useGetStatusQuery } from "@/redux/features/dashboard/dashboardApi";
import { setConversationMessage } from "@/redux/features/openAi/openAiSlice";
import { useAppDispatch } from "@/redux/hook";
import { ChevronDown, HandHeart, MessageCircleWarning, Search } from "lucide-react";

import { DonkiLogo } from "../ui/donki-logo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AppAlert } from "./AppAlert";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { data, isLoading, isSuccess } = useGetStatusQuery("");
    return (
        <div id="navbar">
            <div className="container  flex items-center justify-between px-4 py-2 xl:py-5">
                <Link
                    href={"/"}
                    onClick={() => {
                        dispatch(setConversationMessage([]));
                    }}
                >
                    <div className="flex items-center gap-1.5">
                        <div className="cursor-pointer rounded-full bg-secondary border border-border p-2 md:p-2.5">
                            <Search className="text-primary max-sm:size-4" />
                        </div>
                        <span className="text-foreground/80">Seek</span>
                    </div>
                </Link>
                <div className="hidden lg:block">
                    {!isLoading && data?.data && (
                        <AppAlert description={data.data?.description} status={data.data?.status} />
                    )}
                </div>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger className="flex items-center gap-1.5">
                        <DonkiLogo />
                        <ChevronDown className={`${open ? "rotate-180 transition-all duration-300" : ""}`} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-36 space-y-3 rounded-xl rounded-tr-none border border-secondary py-3.5 text-sm text-foreground/80 drop-shadow-xl">
                        <DropdownMenuItem
                            onClick={() => router.push("/about-us")}
                            className="flex cursor-pointer items-center justify-center gap-1"
                        >
                            <MessageCircleWarning size={20} />
                            <span>About us</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => router.push("/donate-us")}
                            className="flex items-center cursor-pointer justify-center gap-1"
                        >
                            <HandHeart size={20} />
                            <span>Donate</span>
                        </DropdownMenuItem>

                        <ThemeSwitcher />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex justify-center px-4">
                <div className="block lg:hidden">
                    {!isLoading && data?.data && (
                        <AppAlert description={data.data?.description} status={data.data?.status} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
