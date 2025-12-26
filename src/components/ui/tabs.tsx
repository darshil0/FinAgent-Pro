"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

interface TabsProps
  extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: "default" | "test-suite" | "metrics" | "compliance";
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    data-slot="tabs"
    data-variant={variant}
    className={cn(
      "w-full flex flex-col gap-4",
      className
    )}
    {...props}
  />
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(
      // QA Dashboard Glassmorphism Container
      "glass-card inline-flex h-12 w-fit items-center justify-center rounded-3xl p-1.5 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all",
      
      // Variant-specific rings
      "[data-parent-variant=test-suite]:ring-2 [data-parent-variant=test-suite]:ring-rose-500/20",
      "[data-parent-variant=metrics]:ring-2 [data-parent-variant=metrics]:ring-sky-500/20",
      "[data-parent-variant=compliance]:ring-2 [data-parent-variant=compliance]:ring-emerald-500/20",
      
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      // QA Dashboard Tab Button
      "group inline-flex h-full flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs md:text-sm font-mono font-semibold uppercase tracking-wider transition-all duration-200",
      
      // Inactive state
      "bg-slate-800/30 hover:bg-slate-700/50 hover:text-slate-200 hover:shadow-inner hover:shadow-sky-500/10 border border-slate-700/50 backdrop-blur-sm",
      
      // Active state
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500/90 data-[state=active]:to-indigo-500/90 data-[state=active]:text-slate-900 data-[state=active]:shadow-2xl data-[state=active]:shadow-sky-500/25 data-[state=active]:ring-2 data-[state=active]:ring-sky-500/50 data-[state=active]:border-sky-500/50",
      
      // Focus & Accessibility
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:shadow-sky-500/30",
      
      // Disabled
      "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
      
      // Icons
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      // QA Content Panel
      "glass-card flex-1 rounded-2xl p-6 pt-0 mt-4 bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 shadow-2xl shadow-black/20 min-h-[200px]",
      "focus-visible:outline-none",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Content>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
