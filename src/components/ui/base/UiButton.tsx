"use client";

import { Button as FBButton, type ButtonProps } from "flowbite-react";
import clsx from "clsx";

interface UiButtonProps extends ButtonProps {variant?: "primary" | "secondary" | "accent" | "outline";}

export function UiButton({children, variant = "primary", className, ...props}: UiButtonProps) {
    const variants = {
        primary:
            "bg-primary hover:bg-primary-500 text-white focus:ring-primary-400",
        secondary:
            "bg-secondary hover:bg-secondary-600 text-accent-100 focus:ring-secondary-400",
        accent:
            "bg-accent hover:bg-accent-400 text-white focus:ring-accent-300",
        outline:
            "border border-primary-600 text-primary-400 hover:bg-primary-100 focus:ring-primary-300",
    };

    return (
        <FBButton
            className={clsx(
                "font-semibold rounded-lg transition-all duration-200",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </FBButton>
    );
}
