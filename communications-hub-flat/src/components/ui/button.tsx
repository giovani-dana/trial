import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98] [&_svg:last-child:not(:first-child)]:transition-transform [&_svg:last-child:not(:first-child)]:duration-200 hover:[&_svg:last-child:not(:first-child)]:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "bg-brand-gradient text-white shadow-card ring-1 ring-inset ring-white/20 hover:shadow-lift hover:brightness-110",
        secondary: "bg-secondary text-secondary-foreground hover:bg-brand-100",
        outline: "border border-input bg-white/70 text-foreground hover:border-brand-300 hover:bg-brand-50",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: { default: "h-10 px-4", sm: "h-9 px-3 text-[13px]", lg: "h-12 px-6 text-[15px]", icon: "size-10" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  }
);
Button.displayName = "Button";
