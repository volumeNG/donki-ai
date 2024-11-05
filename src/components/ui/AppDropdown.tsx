import React from "react";

import { Ellipsis } from "lucide-react";

import { cn } from "@/lib/utils";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./dropdown-menu";

type TDropdownMenu = {
    dropdownItems: {
        label: string;
        icon: JSX.Element;
        onClick: () => void;
    }[];
    className?: string;
};

const AppDropdown = ({ dropdownItems, className }: TDropdownMenu) => {
    return (
        <DropdownMenu key={dropdownItems.length}>
            <DropdownMenuTrigger className="flex size-9 lg:size-11 items-center justify-center rounded-full border border-secondary bg-secondary text-foreground/80">
                <Ellipsis />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                key={dropdownItems.length + "DropdownMenu"}
                className={cn("w-44 rounded-xl", className)}
            >
                {dropdownItems.map((prompt, i) => (
                    <React.Fragment key={prompt.label}>
                        <DropdownMenuItem
                            className="flex cursor-pointer rounded-md items-center justify-between gap-4 px-4 py-2"
                            onClick={prompt.onClick}
                        >
                            {prompt.label}
                            {prompt.icon}
                        </DropdownMenuItem>
                        {dropdownItems.length - 1 !== i && <DropdownMenuSeparator />}
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { AppDropdown };
