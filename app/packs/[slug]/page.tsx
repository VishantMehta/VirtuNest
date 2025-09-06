"use client";

import Image from "next/image";
import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Check, ShoppingCart } from "lucide-react";
import { useRef } from "react";

import { allProducts } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ActionPackCard } from "@/components/action-pack-card";
import { cn } from "@/lib/utils";

const getProductBySlug = (slug: string) => {
    return allProducts.find((p) => p.slug === slug);
};

const sectionAnimation: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeInOut",
            staggerChildren: 0.1,
        },
    },
};

const itemAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
    },
};


//for SEO/MetaData
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const product = allProducts.find(p => p.slug === params.slug);
    if (!product) return {};

    return {
        title: `${product.title} | VirtuNest`,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            url: `https://virtunest.vercel.app/packs/${product.slug}`,
            images: [{ url: "/og-image.png", width: 1200, height: 630, alt: product.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: product.title,
            description: product.description,
            images: ["/og-image.png"],
        },
    };
}


export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const relatedProducts = allProducts
        .filter((p) => p.category === product.category && p.slug !== product.slug)
        .slice(0, 3);

    const purchaseBoxRef = useRef<HTMLDivElement>(null);
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!purchaseBoxRef.current) return;
        const rect = purchaseBoxRef.current.getBoundingClientRect();
        purchaseBoxRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        purchaseBoxRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    return (
        <main className="min-h-screen aurora-background">
            <div className="h-20 w-full" />

            <motion.div
                variants={sectionAnimation}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 py-12 md:py-20"
            >
                <motion.div variants={itemAnimation} className="mb-8">
                    <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-foreground">
                        <Link href="/packs">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to All Packs
                        </Link>
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                    <motion.div variants={itemAnimation} className="w-full lg:col-span-3">
                        <div className="sticky top-28">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-xl">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={sectionAnimation}
                        className="flex flex-col lg:col-span-2"
                    >
                        <motion.span
                            variants={itemAnimation}
                            className="mb-3 inline-block self-start rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground"
                        >
                            {product.category}
                        </motion.span>
                        <motion.h1
                            variants={itemAnimation}
                            className="text-4xl md:text-5xl font-heading mb-4"
                        >
                            {product.title}
                        </motion.h1>
                        <motion.p
                            variants={itemAnimation}
                            className="text-lg text-muted-foreground mb-8"
                        >
                            {product.description}
                        </motion.p>

                        <motion.div variants={itemAnimation} className="space-y-4 mb-10">
                            <h3 className="font-semibold text-xl font-heading">
                                What&apos;s Included:
                            </h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 mr-3 text-primary shrink-0" />
                                    Actionable Digital Guide (PDF)
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 mr-3 text-primary shrink-0" />
                                    Printable Checklists & Worksheets
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 mr-3 text-primary shrink-0" />
                                    Lifetime Access & Updates
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            ref={purchaseBoxRef}
                            onMouseMove={onMouseMove}
                            variants={itemAnimation}
                            className={cn(
                                "card-border-glow mt-auto pt-8",
                                "bg-card rounded-xl p-6 shadow-xl dark:shadow-none border border-border"
                            )}
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-between">
                                <p className="text-4xl font-bold font-sans mb-4 sm:mb-0">
                                    <span className="text-xl font-medium align-middle">₹</span>
                                    {product.price}
                                </p>
                                <Button asChild size="lg" className="h-14 text-lg font-semibold w-full sm:w-auto rounded-full">
                                    <a
                                        href={product.superProfileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Get Access Now
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {relatedProducts.length > 0 && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionAnimation}
                    className="py-24 md:py-32 bg-secondary border-t border-border/50"
                >
                    <div className="container mx-auto px-4">
                        <h2
                            className="text-3xl md:text-5xl font-bold text-center mb-12 font-heading"
                        >
                            You Might Also Like
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {relatedProducts.map((related) => (
                                <ActionPackCard
                                    key={related.slug}
                                    slug={related.slug}
                                    title={related.title}
                                    category={related.category}
                                    imageUrl={related.imageUrl}
                                    price={related.price}
                                />
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}
        </main>
    );
}