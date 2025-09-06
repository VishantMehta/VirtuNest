"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Quote, CheckCircle, Users, Zap } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Points } from "three";

import { ActionPackCard } from "@/components/action-pack-card";
import { Button } from "@/components/ui/button";
import { featuredProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

function AnimatedStars() {
  const starsRef1 = useRef<Points>(null);
  const starsRef2 = useRef<Points>(null);

  useFrame(() => {
    if (starsRef1.current) {
      starsRef1.current.rotation.x += 0.0001;
      starsRef1.current.rotation.y += 0.0002;
    }
    if (starsRef2.current) {
      starsRef2.current.rotation.x += 0.00005;
      starsRef2.current.rotation.y += 0.0001;
    }
  });

  return (
    <>
      <Stars ref={starsRef1} radius={50} count={1500} factor={4} fade speed={1.5} />
      <Stars ref={starsRef2} radius={100} count={2500} factor={4} fade speed={1.5} />
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="flex min-h-screen flex-col items-center aurora-background">
      <HeroSection mounted={mounted} />
      <FeaturedPacksSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
  );
}

const sectionAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut", staggerChildren: 0.2 },
  },
};

const itemAnimation: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

function HeroSection({ mounted }: { mounted: boolean }) {
  const titleWords = "Actionable Guides for a Better You".split(" ");

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-transparent">
        {mounted && (
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 1] }}>
              <AnimatedStars />
            </Canvas>
          </Suspense>
        )}
      </div>

      <div className="relative z-10 container px-4 md:px-6">
        <motion.div
          variants={sectionAnimation}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1 className="text-4xl font-heading tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {titleWords.map((word, i) => (
              <motion.span key={i} variants={itemAnimation} className="inline-block mr-4">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={itemAnimation}
            className="mx-auto max-w-[700px] text-muted-foreground md:text-xl my-8"
          >
            Stop endlessly scrolling. Get curated, high-impact digital toolkits in fitness,
            wellness, and more. Delivered instantly.
          </motion.p>

          <motion.div variants={itemAnimation}>
            <Button
              asChild
              size="lg"
              className="h-14 text-lg font-semibold rounded-none shadow-md border-0
                         transition-all duration-300 ease-in-out
                        hover:shadow-glow-hover hover:scale-105 active:scale-100"
            >
              <Link href="#packs">Explore Action Packs</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedPacksSection() {
  return (
    <motion.section
      id="packs"
      variants={sectionAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full bg-background border-y border-border/50 py-24 md:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Action Packs
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Each pack is a comprehensive toolkit designed to help you achieve specific goals
            and build lasting habits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <ActionPackCard
              key={product.slug}
              slug={product.slug}
              title={product.title}
              category={product.category}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: Zap, title: "Choose Your Pack", description: "Select a toolkit that aligns with your personal or professional goals." },
    { icon: CheckCircle, title: "Get Instant Access", description: "Receive your digital guides and resources immediately after purchase." },
    { icon: Users, title: "Start Improving", description: "Apply the proven strategies and see tangible results in days, not weeks." },
  ];

  return (
    <motion.section
      variants={sectionAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full bg-secondary py-24 md:py-32 relative overflow-hidden aurora-section"
    >
      <div className="relative z-10 container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Get Results in 3 Simple Steps
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
            We eliminate the fluff and deliver concise, actionable toolkits to help you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-background dark:bg-primary/10 text-primary mb-6 shadow-md dark:shadow-none border border-border">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl mb-2 font-heading">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}


function TestimonialsSection() {
  const testimonials = [
    { name: "Aarav Sharma", role: "Software Engineer", text: "The 'Productivity Power-Up' pack was a game-changer. I'm more focused and getting twice as much done. Highly recommended!" },
    { name: "Priya Patel", role: "Freelance Designer", text: "I was stuck in a creative rut. The 'Mindful Creator' guide helped me find inspiration again. The visual cheat sheet is on my desk now!" },
    { name: "Rohan Das", role: "Student", text: "As a student juggling multiple things, the 'Habit Hacker' toolkit gave me a clear system to build better study habits. Worth every rupee." },
  ];

  return (
    <motion.section
      variants={sectionAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full py-24 md:py-32 border-t border-border/50"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Trusted by Ambitious Individuals
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
            See what our community is saying about VirtuNest Action Packs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemAnimation}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const TestimonialCard = ({ name, role, text }: { name: string; role: string; text: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className={cn(
        "card-border-glow relative h-full bg-card p-8 rounded-xl",
        "shadow-lg dark:shadow-none overflow-hidden"
      )}
    >
      <Quote className="absolute top-4 right-4 h-12 w-12 text-border/20 pointer-events-none" />
      <p className="text-foreground/90 mb-6 text-lg italic">“{text}”</p>
      <div className="font-sans font-semibold text-foreground text-lg">{name}</div>
      <div className="text-sm text-muted-foreground">{role}</div>
    </div>
  );
};

function FinalCTASection() {
  return (
    <section className="w-full py-24 md:py-32 text-center bg-secondary border-t border-border/50 relative overflow-hidden aurora-section">
      <div className="relative z-10 container px-4 md:px-6">
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          Ready to Unlock Your Potential?
        </h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto md:text-lg">
          Your journey to a better, more productive you starts now. Explore our collection and find the perfect Action Pack today.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="h-14 text-lg font-semibold rounded-full shadow-md">
            <Link href="/packs">View All Action Packs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}