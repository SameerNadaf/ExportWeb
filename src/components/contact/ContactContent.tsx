"use client";

import { ContactForm } from "@/components/ui/ContactForm";
import { motion } from "framer-motion";

interface ContactContentProps {
  data: {
    address?: string;
    phone?: string;
    email?: string;
  };
}

export function ContactContent({ data }: ContactContentProps) {
  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
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
          Get In Touch
        </h1>
        <p className="text-lg text-muted-foreground">
          Ready to order or have questions about our products? Fill out the form
          below or reach us directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-1 space-y-8"
        >
          <div>
            <h3 className="text-xl font-bold mb-4">Head Office</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {data?.address ||
                `123 Export Plaza, Sector 5\nMumbai, Maharashtra\nIndia - 400001`}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Direct Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Phone:</span>{" "}
                {data?.phone || "+91 98765 43210"}
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Email:</span>{" "}
                <a
                  href={`mailto:${data?.email || "export@greenary.com"}`}
                  className="hover:text-primary transition-colors"
                >
                  {data?.email || "export@greenary.com"}
                </a>
              </li>
            </ul>
          </div>

          <div className="pt-4 h-[200px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085516053351!3d12.953959988118815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1719220000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "0.75rem" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full bg-muted rounded-xl"
            ></iframe>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-2"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
