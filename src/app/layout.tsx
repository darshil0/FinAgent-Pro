import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { Toaster } from "@/components/ui/sonner";

// Next.js Font Optimization (Performance + Accessibility)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "AI FinAgent QA | Automated Testing Framework",
    template: "%s | AI FinAgent QA"
  },
  description: "Production QA automation suite for AI financial agents. Playwright E2E testing, API validation, and compliance checks.",
  openGraph: {
    title: "AI FinAgent QA - Automated Testing Framework",
    description: "Production-ready QA suite for AI financial agents with Playwright E2E",
    url: "https://your-deployment-url.com",
    siteName: "AI FinAgent QA",
    images: [{ url: "/og-qa-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  // Security & Compliance Headers
  other: {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body 
        className={`${inter.variable} min-h-screen bg-slate-950 font-sans antialiased selection:bg-sky-500/30 selection:text-sky-200`}
      >
        {/* Global Diagnostic Layer */}
        <ErrorReporter />
        
        {/* Layout Container */}
        <div className="relative flex min-h-screen flex-col">
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>

        {/* Sonner Toaster with FinTech/Dark Aesthetic */}
        <Toaster 
          position="top-right"
          theme="dark"
          closeButton
          richColors
          toastOptions={{
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}
