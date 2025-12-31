"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function CompanyIntro() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-muted shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/assets/images/farm-intro.png"
              alt="Sustainable Organic Farming"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase">
              Who We Are
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold font-heading text-primary">
              Connecting the World to Authentic Flavors
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              At Greenary Export, we are passionate about sustainable
              agriculture and global trade. Founded with a mission to support
              local farmers while satisfying international demand, we specialize
              in sourcing the highest grade organic spices, seasonal fruits, and
              fresh vegetables.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our rigorous quality control ensures that only the freshest, most
              aromatic produce reaches your destination.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="text-primary font-medium hover:text-accent transition-colors inline-flex items-center"
              >
                Read our full story
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
