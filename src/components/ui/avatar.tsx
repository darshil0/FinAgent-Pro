"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    variant?: "default" | "qa" | "team" | "status";
    size?: "sm" | "md" | "lg" | "xl";
  }
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      data-variant={variant}
      data-size={size}
      className={cn(
        // QA Dashboard Glassmorphism Base
        "glass-card relative inline-flex shrink-0 overflow-hidden rounded-3xl ring-2 ring-slate-800/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all group",
        
        // Size variants
        "size-10 [&[data-size=sm]]:size-8 [&[data-size=lg]]:size-14 [&[data-size=xl]]:size-16",
        
        // Variant-specific rings
        "[data-variant=qa]:ring-sky-500/30",
        "[data-variant=team]:ring-emerald-500/30",
        "[data-variant=status]:ring-rose-500/30",
        
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn(
      "aspect-square size-full object-cover rounded-[inherit] group-hover:brightness-105 group-hover:contrast-110 transition-all",
      className
    )}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    variant?: "default" | "qa" | "team" | "status";
  }
>(({ className, variant = "default", children, ...props }, ref) => {
  const getInitials = (name?: string) => {
    if (!name) return "QA";
    const names = name.trim().split(" ");
    return names.length > 1 
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  const getFallbackColor = (variant: string) => {
    switch (variant) {
      case "qa": return "bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-300";
      case "team": return "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300";
      case "status": return "bg-gradient-to-br from-rose-500/20 to-pink-500/20 text-rose-300";
      default: return "bg-gradient-to-br from-slate-500/30 to-slate-700/50 text-slate-200";
    }
  };

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-[inherit] font-mono font-bold text-xs uppercase backdrop-blur-sm",
        getFallbackColor(variant),
        className
      )}
      {...props}
    >
      {children || getInitials(props["aria-label"] as string)}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
