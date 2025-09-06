// NOTE: Using a placeholder service for images. Replace with your actual product images.
// Using a seed based on the slug ensures the image remains consistent for each product.

export type Product = {
    slug: string;
    title: string;
    category: string;
    description: string; //added for the product detail page
    imageUrl: string;
    price: number;
    superProfileUrl: string;
};

export const allProducts: Product[] = [
    {
        slug: "7-day-fitness-fuel",
        title: "7-Day Fitness Fuel",
        category: "Fitness",
        description: "A comprehensive 7-day workout and meal plan designed to kickstart your fitness journey and build sustainable habits.",
        imageUrl: "https://picsum.photos/seed/fitness-fuel/600/400",
        price: 499,
        superProfileUrl: "#",
    },
    {
        slug: "mindful-morning-routine",
        title: "Mindful Morning Routine",
        category: "Wellness",
        description: "Transform your mornings from chaotic to calm with guided meditations, journaling prompts, and a step-by-step routine.",
        imageUrl: "https://picsum.photos/seed/mindful-morning/600/400",
        price: 399,
        superProfileUrl: "#",
    },
    {
        slug: "digital-declutter-kit",
        title: "Digital Declutter Kit",
        category: "Productivity",
        description: "Reclaim your focus. This kit provides tools and strategies to organize your digital life, from your inbox to your desktop.",
        imageUrl: "https://picsum.photos/seed/digital-declutter/600/400",
        price: 399,
        superProfileUrl: "#",
    },
    {
        slug: "30-minute-meal-prep",
        title: "30-Minute Meal Prep",
        category: "Food",
        description: "Save time and eat healthier with a collection of delicious recipes that can be prepped in 30 minutes or less.",
        imageUrl: "https://picsum.photos/seed/meal-prep/600/400",
        price: 599,
        superProfileUrl: "#",
    },
    {
        slug: "home-workout-essentials",
        title: "Home Workout Essentials",
        category: "Fitness",
        description: "No gym? No problem. A guide to the most effective bodyweight exercises and routines you can do from home.",
        imageUrl: "https://picsum.photos/seed/home-workout/600/400",
        price: 699,
        superProfileUrl: "#",
    },
    {
        slug: "the-art-of-journaling",
        title: "The Art of Journaling",
        category: "Wellness",
        description: "Unlock the therapeutic benefits of journaling with 50+ prompts and techniques for self-reflection and growth.",
        imageUrl: "https://picsum.photos/seed/journaling-art/600/400",
        price: 299,
        superProfileUrl: "#",
    },
    {
        slug: "focus-flow-mastery",
        title: "Focus & Flow Mastery",
        category: "Productivity",
        description: "Learn the secrets of deep work and achieve a state of flow with scientifically-backed productivity techniques.",
        imageUrl: "https://picsum.photos/seed/focus-flow/600/400",
        price: 599,
        superProfileUrl: "#",
    },
    {
        slug: "plant-based-recipe-pack",
        title: "Plant-Based Recipe Pack",
        category: "Food",
        description: "Explore the world of plant-based eating with over 40 easy-to-make, delicious, and healthy recipes for every meal.",
        imageUrl: "https://picsum.photos/seed/plant-based/600/400",
        price: 799,
        superProfileUrl: "#",
    },
];

// Manually selecting featured products for a better visual mix on the homepage.
export const featuredProducts = [
    allProducts.find((p) => p.slug === "7-day-fitness-fuel"),
    allProducts.find((p) => p.slug === "digital-declutter-kit"),
    allProducts.find((p) => p.slug === "mindful-morning-routine"),
].filter(Boolean) as Product[]; 