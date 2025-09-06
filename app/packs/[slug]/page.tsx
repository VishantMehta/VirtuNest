import { notFound } from "next/navigation";
import { allProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = allProducts.find((p) => p.slug === slug);
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

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = allProducts.find((p) => p.slug === slug);
    if (!product) notFound();

    const relatedProducts = allProducts
        .filter((p) => p.category === product.category && p.slug !== product.slug)
        .slice(0, 3);

    return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}