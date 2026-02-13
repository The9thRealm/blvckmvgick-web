export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "MVGICK HOODIE v1",
    price: 85,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    description: "Heavyweight cotton fleece. Oversized fit. High-density puff print.",
  },
  {
    id: "2",
    name: "VOID TEE",
    price: 45,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
    description: "Premium jersey knit. Minimalist chest embroidery. Ribbed collar.",
  },
  {
    id: "3",
    name: "BLVCK BEANIE",
    price: 30,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1576871333021-d5d3aa331f55?auto=format&fit=crop&q=80&w=800",
    description: "Soft acrylic knit. Signature brand tag.",
  },
  {
    id: "4",
    name: "ECLIPSE CARGO PANTS",
    price: 120,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1624372927054-944a957ca3ad?auto=format&fit=crop&q=80&w=800",
    description: "Technical nylon blend. Multiple utility pockets. Tapered fit.",
  },
];
