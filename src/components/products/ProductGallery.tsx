"use client";

import { useState } from "react";
import { ProductImage } from "@/types/firestore";

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      <div className="aspect-square md:aspect-square w-full rounded-2xl overflow-hidden bg-muted relative border border-border max-h-[400px] md:max-h-none">
        {/* Main Image */}
        {currentImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentImage.url}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-bold text-4xl bg-secondary/5">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={img.publicId}
              onClick={() => setSelectedIndex(i)}
              className={`aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:ring-2 ring-primary ring-offset-2 transition-all ${
                selectedIndex === i ? "ring-2" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={`${name} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
