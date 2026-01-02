"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Certificate } from "@/types/firestore";
import Image from "next/image";

interface CertificationsContentProps {
  certificates: Certificate[];
}

export function CertificationsContent({
  certificates,
}: CertificationsContentProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const ctaVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
          Our Quality Promise
        </h1>
        <p className="text-lg text-muted-foreground">
          We adhere to the strictest international standards to ensure that
          every product leaving our facility is safe, pure, and of the highest
          quality.
        </p>
      </motion.div>

      {certificates.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={item}
              transition={{ type: "spring", bounce: 0.4 }}
              className="p-4 rounded-xl border border-border bg-card transition-all hover:shadow-xl hover:-translate-y-1 duration-300 transform-gpu group"
            >
              <div className="relative aspect-[4/3] w-full bg-muted rounded-lg overflow-hidden mb-4">
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-foreground">
                {cert.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>
            Certifications are currently being updated. Please check back soon.
          </p>
        </div>
      )}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={ctaVariant}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-20 p-8 md:p-12 bg-muted/50 rounded-2xl text-center"
      >
        <h2 className="text-2xl font-bold font-heading text-primary mb-4">
          Request Certificates
        </h2>
        <p className="text-muted-foreground mb-8 text-sm md:text-base">
          Need to verify our credentials? We are happy to provide copies of our
          certificates upon request.
        </p>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Contact Compliance Team
        </Link>
      </motion.div>
    </div>
  );
}
