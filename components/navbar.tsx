"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Moon, Sun, Menu, X, Rocket } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// links
const navLinks = [
    { href: "/packs", label: "All Packs" },
    // { href: "/blog", label: "Blog" }, //uncomment later if needed
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
            document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "border-b border-border/60 bg-background/80 backdrop-blur-lg"
                        : "border-b border-transparent"
                )}
            >
                <div className="container mx-auto flex h-20 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Rocket className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-[-15deg]" />
                        <span className="text-xl font-bold font-heading">VirtuNest</span>
                    </Link>

                    <DesktopNav />

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button className="hidden sm:inline-flex rounded-full font-semibold">
                            Get Started
                        </Button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="ml-2 md:hidden rounded-full p-2 text-foreground transition-colors hover:bg-accent"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="open"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileNav onLinkClick={() => setIsMobileMenuOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

function DesktopNav() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <nav
            className="hidden items-center gap-2 text-sm font-medium md:flex"
            onMouseLeave={() => setHoveredLink(null)}
        >
            {navLinks.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    onMouseEnter={() => setHoveredLink(href)}
                    className="relative rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                    {hoveredLink === href && (
                        <motion.div
                            layoutId="desktop-nav-underline"
                            className="absolute inset-0 bg-accent rounded-full z-0"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{label}</span>
                </Link>
            ))}
        </nav>
    );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="h-10 w-10" />;
    }

    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <AnimatePresence mode="wait">
                {theme === "dark" ? (
                    <motion.div
                        key="sun"
                        initial={{ y: -20, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 20, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: 90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    </motion.div>
                )}
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

const mobileMenuVariants: Variants = {
    hidden: { x: "100%", transition: { ease: "easeInOut", duration: 0.4 } },
    visible: {
        x: 0,
        transition: { ease: "easeInOut", duration: 0.4, staggerChildren: 0.1 },
    },
    exit: {
        x: "100%",
        transition: { ease: "easeInOut", duration: 0.3, delay: 0.2 },
    },
};

const mobileLinkVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 200, damping: 25 },
    },
    exit: { x: 50, opacity: 0, transition: { duration: 0.1 } },
};

function MobileNav({ onLinkClick }: { onLinkClick: () => void }) {
    return (
        <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-background/95 backdrop-blur-xl md:hidden"
        >
            <nav className="flex flex-col items-center gap-10">
                {navLinks.map(({ href, label }) => (
                    <motion.div key={href} variants={mobileLinkVariants}>
                        <Link
                            href={href}
                            onClick={onLinkClick}
                            className="text-3xl font-semibold text-foreground transition-colors hover:text-primary"
                        >
                            {label}
                        </Link>
                    </motion.div>
                ))}
                <motion.div variants={mobileLinkVariants}>
                    <Button
                        size="lg"
                        className="rounded-none text-xl h-14"
                        onClick={onLinkClick}
                    >
                        Get Started
                    </Button>
                </motion.div>
            </nav>
        </motion.div>
    );
}
