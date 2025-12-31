"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative w-full bg-black text-white py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/assets/images/hero-bg.png"
            alt="Premium Spices and Fruits"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight mb-6 max-w-4xl text-white">
            {title || (
              <>
                Premium Organic Spices, Fruits & Vegetables{" "}
                <br className="hidden md:block" /> from{" "}
                <span className="text-accent">Nature's Finest Farms</span>
              </>
            )}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
            {subtitle ||
              "We bridge the gap between authentic local farmers and the global market, delivering freshness and quality in every shipment."}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-medium text-accent-foreground shadow hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-transform hover:scale-105"
          >
            Explore Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white bg-transparent px-8 text-base font-medium text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-transform hover:scale-105"
          >
            Contact for Export
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
