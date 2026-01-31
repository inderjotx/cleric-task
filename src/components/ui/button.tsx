import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// =============================================================================
// Button Variants Configuration
// =============================================================================

const buttonVariants = cva(
  [
    "inline-flex cursor-pointer items-center justify-center gap-2",
    "whitespace-nowrap font-medium leading-[1.4] transition-colors",
    "rounded-full",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  ],
  {
    variants: {
      variant: {
        default: "bg-white text-[#313131] hover:bg-[rgba(236,236,236,0.9)]",
        dark: "bg-black text-white hover:bg-[rgba(0,0,0,0.8)]",
        outline: [
          "backdrop-blur-[4px] bg-white/5 border border-white",
          "text-white hover:bg-white/10",
        ],
        secondary: [
          "backdrop-blur-[4px] bg-[rgba(255,255,255,0.05)]",
          "border border-[rgba(0,0,0,0.5)] text-[#313131]",
          "hover:bg-[rgba(0,0,0,0.1)]",
        ],
        ghost: "bg-transparent text-[#313131] hover:bg-black/5",
        link: "text-[#313131] underline-offset-4 hover:underline",
        destructive: [
          "bg-destructive text-white hover:bg-destructive/90",
          "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
          "dark:bg-destructive/60",
        ],
      },
      size: {
        default: "px-6 py-2.5 text-[15px]",
        sm: "px-4 py-1.5 text-[15px]",
        lg: "px-8 py-3 text-[18px]",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// =============================================================================
// Button Component
// =============================================================================

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      style={style}
      {...props}
    />
  );
}

export { Button, buttonVariants };
