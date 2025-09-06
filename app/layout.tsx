import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

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
  title: "VirtuNest - Actionable Guides for a Better You",
  description: "Unlock your potential with high-impact digital toolkits in fitness, wellness, productivity, and more. Stop scrolling, start improving.",
  openGraph: {
    title: "VirtuNest - Actionable Guides for a Better You",
    description: "Unlock your potential with high-impact digital toolkits.",
    url: "https://virtunest.xyz", // Replace with your actual domain
    siteName: "VirtuNest",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtuNest - Actionable Guides for a Better You",
    description: "Unlock your potential with high-impact digital toolkits.",
    images: ["/og-image.png"],
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}