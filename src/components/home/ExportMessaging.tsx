"use client";

import { motion, Variants } from "framer-motion";
import { PackageCheck, Globe2, FileText } from "lucide-react";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      delay: i * 0.15,
    },
  }),
};

export function ExportMessaging() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-sm font-bold tracking-widest text-secondary uppercase mb-3"
          >
            Global Reach
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold font-heading text-primary mb-6"
          >
            Exporting Excellence Worldwide
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            We bridge the gap between premium organic farms and international
            markets with our robust logistics and unwavering commitment to
            quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: PackageCheck,
              title: "Secure Packaging",
              description:
                "International standard packaging ensures product freshness and integrity during long-distance transit.",
            },
            {
              icon: Globe2,
              title: "Global Logistics",
              description:
                "Seamless supply chain network covering major ports across Europe, the Americas, and Asia.",
            },
            {
              icon: FileText,
              title: "Documentation Support",
              description:
                "Comprehensive handling of phytosanitary certificates, origin forms, and customs clearance.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="group bg-background p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-border/50 hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold mb-3 font-heading text-foreground group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
