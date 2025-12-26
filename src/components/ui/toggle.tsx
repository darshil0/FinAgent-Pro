"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  // QA Dashboard Base Styles
  "inline-flex items-center justify-center gap-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow-lg hover:shadow-xl active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/30",
  
  {
    variants: {
      variant: {
        // Standard toggle
        default: "bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700/50 data-[state=on]:bg-sky-500/90 data-[state=on]:text-slate-900 data-[state=on]:border-sky-500/50 data-[state=on]:shadow-sky-500/25 hover:data-[state=on]:bg-sky-500",
        
        // Outline style
        outline: "bg-transparent/50 backdrop-blur-sm border-2 border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/30 data-[state=on]:bg-gradient-to-r data-[state=on]:from-sky-500/90 data-[state=on]:to-indigo-500/90 data-[state=on]:text-slate-900 data-[state=on]:border-sky-500/70 data-[state=on]:shadow-sky-500/30",
        
        // QA Test Status
        test: "border-2 data-[state=on]:bg-emerald-500/90 data-[state=on]:text-slate-900 data-[state=on]:border-emerald-500/50 data-[state=on]:shadow-emerald-500/25 hover:data-[state=on]:bg-emerald-500 data-[state=off]:bg-rose-500/20 data-[state=off]:border-rose-500/30 hover:data-[state=off]:bg-rose-500/30",
        
        // Compliance Switch
        compliance: "border-2 data-[state=on]:bg-emerald-500/90 data-[state=on]:text-slate-900 data-[state=on]:border-emerald-500/50 data-[state=on]:shadow-emerald-500/25 hover:data-[state=on]:bg-emerald-500 data-[state=off]:bg-slate-800/50 data-[state=off]:border-slate-700/50 hover:data-[state=off]:bg-slate-700/70",
        
        // Danger toggle (API kill switch)
        destructive: "border-2 data-[state=on]:bg-rose-500/90 data-[state=on]:text-slate-900 data-[state=on]:border-rose-500/50 data-[state=on]:shadow-rose-500/25 hover:data-[state=on]:bg-rose-500 data-[state=off]:bg-slate-800/50 data-[state=off]:border-slate-700/50 hover:data-[state=off]:bg-slate-700/70"
      },
      
      size: {
        sm: "h-7 px-2 min-w-7 text-xs",
        default: "h-9 px-3 min-w-9",
        lg: "h-11 px-4 min-w-11 text-sm",
        icon: "h-10 w-10 p-0"
      }
    },
    
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant = "default", size = "default", children, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    data-slot="toggle"
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  >
    {children}
  </TogglePrimitive.Root>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
