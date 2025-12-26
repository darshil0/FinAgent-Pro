"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    variant?: "default" | "test-results" | "compliance" | "metrics";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    data-slot="accordion"
    data-variant={variant}
    className={cn(
      // QA Dashboard Container
      "w-full space-y-1 bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-xl",
      
      // Variant-specific styling
      "data-[variant=test-results]:ring-2 data-[variant=test-results]:ring-rose-500/20",
      "data-[variant=compliance]:ring-2 data-[variant=compliance]:ring-emerald-500/20 shadow-emerald-500/10",
      "data-[variant=metrics]:bg-gradient-to-b data-[variant=metrics]:from-slate-900/50 data-[variant=metrics]:to-slate-950/50",
      
      className
    )}
    {...props}
  />
));
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn(
      "glass-card overflow-hidden rounded-xl border-0 focus-within:shadow-2xl focus-within:shadow-sky-500/20 focus-within:ring-1 focus-within:ring-sky-500/30 transition-all",
      "data-[state=open]:shadow-2xl data-[state=open]:shadow-sky-500/20 data-[state=open]:ring-1 data-[state=open]:ring-sky-500/30",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        // QA Dashboard Trigger
        "glass-card flex flex-1 items-center justify-between py-4 px-4 font-mono font-semibold text-sm md:text-base transition-all group hover:bg-slate-800/50 hover:backdrop-blur-sm hover:shadow-inner hover:shadow-sky-500/10",
        
        // States
        "data-[state=open]:bg-gradient-to-r data-[state=open]:from-sky-500/20 data-[state=open]:to-indigo-500/20 data-[state=open]:text-sky-300 data-[state=open]:shadow-sky-500/20 data-[state=open]:ring-1 data-[state=open]:ring-sky-500/40",
        
        // Focus & Accessibility
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:shadow-sky-500/30",
        
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        
        // Icon animation
        "[&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0 [&>svg]:transition-transform duration-200 [&[data-state=open]>svg]:rotate-180",
        
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-5 w-5 shrink-0 text-slate-400 group-data-[state=open]:text-sky-400 transition-colors duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className={cn(
      // Smooth animations
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      
      // QA Content styling
      "bg-slate-900/70 backdrop-blur-xl border-t border-slate-700/50",
      
      className
    )}
    {...props}
  >
    <div className="px-4 pb-4 pt-3 text-slate-200">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
