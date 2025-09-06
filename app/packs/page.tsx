"use client";

import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { SearchX } from "lucide-react";

import { ActionPackCard } from "@/components/action-pack-card";
import { allProducts } from "@/lib/products";

const allCategories = ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))];

const sectionAnimation: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeInOut", // FIX
            staggerChildren: 0.1,
        },
    },
};

const itemAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeInOut" }, // FIX
    },
};


export default function AllPacksPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts =
        selectedCategory === "All"
            ? allProducts
            : allProducts.filter((product) => product.category === selectedCategory);

    return (
        <main className="flex min-h-screen flex-col items-center aurora-background">
            <div className="h-20 w-full" />

            <motion.section
                variants={sectionAnimation}
                initial="hidden"
                animate="visible"
                className="relative w-full border-b border-border/50 bg-secondary py-20 md:py-24 text-center"
            >
                <motion.h1
                    variants={itemAnimation}
                    className="text-4xl font-bold sm:text-5xl md:text-6xl font-heading"
                >
                    Explore All Action Packs
                </motion.h1>
                <motion.p
                    variants={itemAnimation}
                    className="mx-auto mt-6 max-w-[700px] text-muted-foreground md:text-xl"
                >
                    Find the perfect toolkit to help you achieve your goals. Filter by category to get started.
                </motion.p>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="visible"
                className="w-full flex-1 py-16 md:py-24"
            >
                <div className="container px-4 md:px-6">
                    <CategoryFilter
                        categories={allCategories}
                        selected={selectedCategory}
                        setSelected={setSelectedCategory}
                    />

                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
                    >
                        <AnimatePresence>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ActionPackCard
                                        key={product.slug}
                                        slug={product.slug}
                                        title={product.title}
                                        category={product.category}
                                        imageUrl={product.imageUrl}
                                        price={product.price}
                                    />
                                ))
                            ) : (
                                <EmptyState />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.section>
        </main>
    );
}

function CategoryFilter({
    categories,
    selected,
    setSelected,
}: {
    categories: string[];
    selected: string;
    setSelected: (category: string) => void;
}) {
    return (
        <motion.div
            variants={itemAnimation}
            initial="hidden"
            animate="visible"
            className="mb-12 flex justify-center"
        >
            <div className="flex flex-wrap justify-center gap-6 rounded-full p-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelected(category)}
                        className={`relative px-2 py-2 text-md font-semibold transition-colors
              ${selected === category ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        {category}
                        {selected === category && (
                            <motion.div
                                layoutId="selected-category-underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="col-span-full flex flex-col items-center justify-center p-16 text-center"
        >
            <SearchX className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-6 text-3xl font-heading">No Packs Found</h3>
            <p className="mt-2 text-muted-foreground">
                Try selecting a different category to see more Action Packs.
            </p>
        </motion.div>
    );
}