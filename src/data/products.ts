export type Category = "spices" | "fruits";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  origin: string; // e.g., "Kerala, India"
  imageUrl: string; // Placeholder for now
  certifications: string[]; // e.g., ["USDA Organic", "ISO"]
}

export const products: Product[] = [
  // Spices
  {
    id: "1",
    slug: "organic-black-pepper",
    name: "Organic Black Pepper",
    category: "spices",
    description:
      "Premium quality Tellicherry black pepper, known for its bold flavor and aroma.",
    origin: "Kerala, India",
    imageUrl: "/placeholder-spice.jpg",
    certifications: ["USDA Organic", "Fair Trade"],
  },
  {
    id: "2",
    slug: "organic-turmeric-powder",
    name: "Organic Turmeric Powder",
    category: "spices",
    description:
      "High curcumin content turmeric powder with potent anti-inflammatory properties.",
    origin: "Andhra Pradesh, India",
    imageUrl: "/placeholder-spice.jpg",
    certifications: ["USDA Organic", "ISO 9001"],
  },
  {
    id: "3",
    slug: "green-cardamom",
    name: "Green Cardamom",
    category: "spices",
    description: "Hand-picked green cardamom pods with intense fragrance.",
    origin: "Idukki, India",
    imageUrl: "/placeholder-spice.jpg",
    certifications: ["Global GAP"],
  },
  {
    id: "4",
    slug: "ceylon-cinnamon",
    name: "Ceylon Cinnamon",
    category: "spices",
    description: "True Ceylon cinnamon quills, delicate and sweet.",
    origin: "Sri Lanka",
    imageUrl: "/placeholder-spice.jpg",
    certifications: ["USDA Organic"],
  },

  // Fruits
  {
    id: "5",
    slug: "alphonso-mango",
    name: "Alphonso Mango",
    category: "fruits",
    description:
      "The king of mangoes, famous for its rich sweetness and non-fibrous texture.",
    origin: "Ratnagiri, India",
    imageUrl: "/placeholder-fruit.jpg",
    certifications: ["Global GAP"],
  },
  {
    id: "6",
    slug: "fresh-pomegranate",
    name: "Fresh Pomegranate",
    category: "fruits",
    description:
      "Ruby red arils with a sweet-tart taste, packed with antioxidants.",
    origin: "Maharashtra, India",
    imageUrl: "/placeholder-fruit.jpg",
    certifications: ["Global GAP"],
  },
  {
    id: "7",
    slug: "cavendish-banana",
    name: "Cavendish Banana",
    category: "fruits",
    description:
      "Premium export-quality bananas, uniform size and blemish-free.",
    origin: "Tamil Nadu, India",
    imageUrl: "/placeholder-fruit.jpg",
    certifications: ["Phytosanitary Certified"],
  },
];
