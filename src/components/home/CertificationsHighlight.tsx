"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

export function CertificationsHighlight() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const certifications = [
    "ISO 9001",
    "USDA Organic",
    "Global GAP",
    "Fair Trade",
    "HACCP",
  ];

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold font-heading text-primary mb-12"
        >
          Certified Excellence
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
              className="h-20 w-36 bg-muted/50 rounded-xl flex items-center justify-center text-sm font-bold text-muted-foreground border border-transparent hover:border-border hover:bg-background hover:shadow-sm transition-all duration-300 cursor-default opacity-70 grayscale hover:opacity-100"
            >
              {cert}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <Link
            href="/certifications"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
          >
            View all certifications &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
