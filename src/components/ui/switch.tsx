"use client";

import * as React from "react";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { MoonStar, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, children, ...props }, ref) => {
    return (
        <SwitchPrimitives.Root
            className={cn(
                "peer relative inline-flex gap-1 h-7 md:h-9 w-[50px] md:w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-secondary data-[state=unchecked]:bg-secondary",
                className
            )}
            {...props}
            ref={ref}
        >
            {props.checked ? <Sun className="text-white absolute left-1" size={18} /> : null}
            <SwitchPrimitives.Thumb
                className={cn(
                    "pointer-events-none h-6 md:h-8 w-6 md:w-8 flex items-center justify-center p-0.5 md:p-1 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 md:data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
                )}
            >
                {children}
            </SwitchPrimitives.Thumb>
            {!props.checked ? <MoonStar className="text-[#353942] absolute right-1" size={20} /> : null}
        </SwitchPrimitives.Root>
    );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
