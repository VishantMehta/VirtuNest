"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActionPackCardProps {
    slug: string;
    title: string;
    category: string;
    imageUrl: string;
    price: number;
    className?: string;
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeInOut" },
    },
};


export function ActionPackCard({
    slug,
    title,
    category,
    imageUrl,
    price,
    className,
}: ActionPackCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            variants={cardVariants}
            layout
            className={cn("w-full h-full", className)}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
            <Link href={`/packs/${slug}`} className="block h-full group">
                <Card
                    className={cn(
                        "card-border-glow flex h-full w-full flex-col overflow-hidden rounded-xl bg-card transition-all duration-300",
                        "shadow-lg dark:shadow-none"
                    )}
                >
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                    </div>
                    <CardHeader className="flex-1 p-6">
                        <span className="mb-2 inline-block self-start rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                            {category}
                        </span>
                        <CardTitle className="text-2xl font-heading">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto flex items-end justify-between p-6 pt-0">
                        <p className="text-3xl font-bold font-sans">
                            <span className="text-base font-medium align-top">₹</span>
                            {price}
                        </p>
                        <div className="flex items-center text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                            View
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}