"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CertificationsContent() {
  const certs = [
    {
      name: "ISO 9001:2015",
      desc: "Certified Quality Management System ensuring consistent product quality and customer satisfaction.",
      color: "bg-blue-50 border-blue-100 text-blue-900",
    },
    {
      name: "USDA Organic",
      desc: "Adherence to strict federal standards for organic farming, free from synthetic pesticides and fertilizers.",
      color: "bg-green-50 border-green-100 text-green-900",
    },
    {
      name: "Global G.A.P",
      desc: "Good Agricultural Practice certification ensuring safe and sustainable agriculture worldwide.",
      color: "bg-sky-50 border-sky-100 text-sky-900",
    },
    {
      name: "HACCP",
      desc: "Hazard Analysis Critical Control Point system for managing food safety risks.",
      color: "bg-orange-50 border-orange-100 text-orange-900",
    },
    {
      name: "Fair Trade",
      desc: "Commitment to fair pricing and better working conditions for farmers and workers.",
      color: "bg-emerald-50 border-emerald-100 text-emerald-900",
    },
    {
      name: "FSSAI License",
      desc: "Licensed by the Food Safety and Standards Authority of India.",
      color: "bg-purple-50 border-purple-100 text-purple-900",
    },
  ];

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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {certs.map((cert) => (
          <motion.div
            key={cert.name}
            variants={item}
            transition={{ type: "spring", bounce: 0.4 }}
            className={`p-8 rounded-xl border ${cert.color} transition-all hover:shadow-xl hover:-translate-y-1 duration-300 transform-gpu cursor-default`}
          >
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-xl font-bold">
              {cert.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold mb-3">{cert.name}</h3>
            <p className="text-sm opacity-80 leading-relaxed">{cert.desc}</p>
          </motion.div>
        ))}
      </motion.div>

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
