"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FooterAnimatorProps {
  children: ReactNode;
}

export function FooterAnimator({ children }: FooterAnimatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
