import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"
const fontHeading = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});


// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://virtunest.vercel.app"),
  title: {
    default: "VirtuNest – Action Pack Marketplace",
    template: "%s | VirtuNest",
  },
  description:
    "VirtuNest is a digital Action Pack marketplace offering AI-powered toolkits in fitness, wellness, beauty, and more. Multi-format packs (PDF, audio, infographic) at just ₹59.",
  keywords: [
    "Action Pack",
    "digital toolkit",
    "self improvement",
    "fitness guides",
    "wellness hacks",
    "beauty tips",
    "productivity pack",
    "SuperProfile",
    "VirtuNest",
    "digital marketplace",
    "AI guides",
    "India",
  ],
  authors: [{ name: "VirtuNest Team" }],
  creator: "VirtuNest",
  publisher: "VirtuNest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://virtunest.vercel.app",
    siteName: "VirtuNest",
    title: "VirtuNest – AI-Powered Action Packs for Instant Results",
    description:
      "Discover AI-powered Action Packs: bite-sized toolkits with PDF guides, audio summaries, and visual cheat sheets. Starting at just ₹59.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VirtuNest Action Pack Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtuNest – AI-Powered Action Packs",
    description:
      "Get instant digital toolkits in fitness, wellness, beauty & productivity. Multi-format packs for just ₹59.",
    images: ["/og-image.png"],
    creator: "@virtu_nest",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://virtunest.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased",
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
