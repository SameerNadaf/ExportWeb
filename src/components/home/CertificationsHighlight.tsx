"use client";

import Link from "next/link";
import { Certificate } from "@/types/firestore";

interface CertificationsHighlightProps {
  certificates: Certificate[];
}

export function CertificationsHighlight({
  certificates,
}: CertificationsHighlightProps) {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold font-heading text-primary mb-12">
          Certified Excellence
        </h2>

        {certificates.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="h-20 w-36 bg-muted/50 rounded-xl flex items-center justify-center text-sm font-bold text-muted-foreground border border-transparent hover:border-border hover:bg-background hover:shadow-sm transition-all duration-300 cursor-default hover:scale-105"
              >
                {cert.title}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Certified quality guaranteed.</p>
        )}

        <div className="mt-12">
          <Link
            href="/certifications"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
          >
            View all certifications &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
