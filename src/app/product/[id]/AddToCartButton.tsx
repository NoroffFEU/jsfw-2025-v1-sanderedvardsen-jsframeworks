"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full max-w-[300px] py-3.5 px-8 rounded-[10px] text-base font-semibold text-white border-none cursor-pointer transition-colors duration-200 ${
        added ? "bg-[#2d7a5a]" : "bg-accent hover:bg-accent-hover"
      }`}
    >
      {added ? "✓ Added to cart" : "Add to Cart"}
    </button>
  );
}
