"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Optimized hook for detecting mobile viewport.
 * Uses event listener cleanup and initial state sync to prevent hydration flicker.
 */
export function useIsMobile(): boolean {
  // Use undefined initially to handle hydration correctly
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Direct sync to state on mount
    const checkMatch = () => setIsMobile(mql.matches);
    
    // Listener for viewport changes
    checkMatch();
    mql.addEventListener("change", checkMatch);
    
    return () => mql.removeEventListener("change", checkMatch);
  }, []);

  // Return false as a default for SSR, or the matched value for Client
  return !!isMobile;
}

/**
 * PRO TIP: For React 19 / Next.js 16, consider using useSyncExternalStore 
 * for even higher performance if this hook is used in high-frequency components.
 */
