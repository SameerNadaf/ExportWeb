"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function WhyChooseUs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const titleAnimation = isMobile
    ? {
        initial: { opacity: 1, x: 0 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.8 },
      };

  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <motion.div className="md:w-1/3" {...titleAnimation}>
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">
              Why Choose Us
            </h2>
            <h3 className="text-3xl font-bold font-heading text-primary mb-6">
              Committed to Quality & Sustainability
            </h3>
            <p className="text-muted-foreground">
              We don't just export products; we build lasting partnerships based
              on trust, quality, and ethical sourcing.
            </p>
            <div className="mt-8">
              <div className="h-64 w-full bg-muted rounded-xl relative overflow-hidden flex items-center justify-center text-muted-foreground shadow-sm">
                <Image
                  src="/assets/images/quality-handshake.png"
                  alt="Quality and Trust"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "100% Organic Certified",
                desc: "Our products are sourced from farms that strictly adhere to organic farming practices, free from harmful pesticides.",
              },
              {
                id: 2,
                title: "Fair Trade Practices",
                desc: "We believe in fair compensation for our farmers, ensuring a sustainable livelihood and community growth.",
              },
              {
                id: 3,
                title: "Traceability",
                desc: "Every batch can be traced back to its origin, guaranteeing complete transparency in our supply chain.",
              },
              {
                id: 4,
                title: "Timely Delivery",
                desc: "Our optimized logistics network ensures your order reaches you on time, preserving product freshness.",
              },
            ].map((item, index) => {
              const cardAnimation = isMobile
                ? {
                    initial: { opacity: 1, y: 0 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0 },
                  }
                : {
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.5 },
                    transition: { duration: 0.5, delay: index * 0.15 },
                    whileHover: { scale: 1.02 },
                  };

              return (
                <motion.div
                  key={item.id}
                  className="space-y-4 p-6 rounded-xl bg-background/50 hover:bg-background border border-transparent hover:border-border/50 transition-colors"
                  {...cardAnimation}
                >
                  <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                    {item.id}
                  </div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
