"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  [
    // QA Dashboard Base
    "relative w-full rounded-2xl p-6 glass-card shadow-lg shadow-black/20 border-slate-700/50 backdrop-blur-xl",
    "grid gap-4 grid-cols-[auto_1fr] items-start",
    "[&>svg]:h-5 [&>svg]:w-5 [&>svg]:translate-y-0.5 [&>svg]:shrink-0",
    "text-sm md:text-base transition-all hover:shadow-xl hover:shadow-sky-500/20",
  ],
  {
    variants: {
      variant: {
        // Standard info
        default: "bg-slate-900/50 text-slate-100 border-slate-700/50",
        
        // Test success (92% coverage)
        test: [
          "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          "[&>svg]:text-emerald-400",
          "data-[slot=alert-description]:text-emerald-200/90"
        ],
        
        // Test failure (clear history)
        testFail: [
          "bg-rose-500/10 text-rose-300 border-rose-500/30",
          "[&>svg]:text-rose-400",
          "data-[slot=alert-description]:text-rose-200/90"
        ],
        
        // Compliance warning
        compliance: [
          "bg-amber-500/10 text-amber-200 border-amber-500/30 ring-1 ring-amber-500/20",
          "[&>svg]:text-amber-400",
          "data-[slot=alert-description]:text-amber-200/90"
        ],
        
        // API error
        apiError: [
          "bg-orange-500/10 text-orange-200 border-orange-500/30 ring-1 ring-orange-500/20",
          "[&>svg]:text-orange-400",
          "data-[slot=alert-description]:text-orange-200/90"
        ],
        
        // Success confirmation
        success: [
          "bg-emerald-500/20 text-emerald-100 border-emerald-500/40 ring-2 ring-emerald-500/30",
          "[&>svg]:text-emerald-400",
          "data-[slot=alert-description]:text-emerald-100/95"
        ],
        
        // Destructive (clear all data)
        destructive: [
          "bg-rose-500/20 text-rose-100 border-rose-500/50 ring-2 ring-rose-500/40",
          "[&>svg]:text-rose-400",
          "data-[slot=alert-description]:text-rose-100/95"
        ]
      },
      
      size: {
        sm: "p-4 text-sm [&>svg]:h-4 [&>svg]:w-4",
        default: "",
        lg: "p-8 text-base [&>svg]:h-6 [&>svg]:w-6"
      }
    },
    
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const Alert = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof alertVariants>
>(({ className, variant = "default", size = "default", ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert"
    data-variant={variant}
    role="alert"
    aria-live="polite"
    className={cn(alertVariants({ variant, size, className }))}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  React.ElementRef<"h3">,
  React.ComponentPropsWithoutRef<"h3">
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="alert-title"
    className={cn(
      "font-mono font-bold tracking-tight text-lg md:text-xl -mb-1",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  React.ElementRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="alert-description"
    className={cn(
      "text-sm md:text-base leading-relaxed font-mono",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
