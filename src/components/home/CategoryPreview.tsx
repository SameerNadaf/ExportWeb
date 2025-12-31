"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function CategoryPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Core Offerings
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Sourced directly from certified organic farms, we bring you the
            finest produce nature has to offer.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Spices Category */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/products/spices"
              className="group relative h-[300px] w-full overflow-hidden rounded-2xl bg-muted block"
            >
              <Image
                src="/assets/images/category-spices.png"
                alt="Premium Spices"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Premium Spices
                </h3>
                <p className="text-white/90 mb-6 max-w-sm">
                  Turmeric, Black Pepper, Cardamom, and more.
                </p>
                <span className="inline-flex items-center text-sm font-medium text-white underline decoration-accent decoration-2 underline-offset-4 group-hover:decoration-white transition-all">
                  View Collection
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Fruits Category */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/products/fruits"
              className="group relative h-[300px] w-full overflow-hidden rounded-2xl bg-muted block"
            >
              <Image
                src="/assets/images/category-fruits.png"
                alt="Exotic Fruits"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Exotic Fruits
                </h3>
                <p className="text-white/90 mb-6 max-w-sm">
                  Mangoes, Bananas, Pineapples, and seasonal delights.
                </p>
                <span className="inline-flex items-center text-sm font-medium text-white underline decoration-accent decoration-2 underline-offset-4 group-hover:decoration-white transition-all">
                  View Collection
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Vegetables Category - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/products/vegetables"
              className="group relative h-[300px] w-full overflow-hidden rounded-2xl bg-muted block"
            >
              <Image
                src="/assets/images/category-vegetables.png"
                alt="Fresh Vegetables"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Fresh Vegetables
                </h3>
                <p className="text-white/90 mb-6 max-w-sm">
                  Farm-fresh seasonal vegetables sourced daily.
                </p>
                <span className="inline-flex items-center text-sm font-medium text-white underline decoration-accent decoration-2 underline-offset-4 group-hover:decoration-white transition-all">
                  View Collection
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
