"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Certificate } from "@/types/firestore";

interface CertificationsHighlightProps {
  certificates: Certificate[];
}

export function CertificationsHighlight({
  certificates,
}: CertificationsHighlightProps) {
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

        {certificates.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-6"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="h-20 w-36 bg-muted/50 rounded-xl flex items-center justify-center text-sm font-bold text-muted-foreground border border-transparent hover:border-border hover:bg-background hover:shadow-sm transition-all duration-300 cursor-default"
              >
                {cert.title}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-muted-foreground">Certified quality guaranteed.</p>
        )}

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
