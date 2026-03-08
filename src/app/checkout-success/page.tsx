"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="max-w-[1100px] mx-auto px-5 py-8 pb-16 w-full">
      <div className="text-center py-20 px-4">
        <div className="w-16 h-16 mx-auto mb-5 bg-accent text-white rounded-full flex items-center justify-center text-3xl">
          ✓
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted mb-8 max-w-[400px] mx-auto">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link
          href="/"
          className="inline-block bg-accent text-white py-3 px-7 rounded-[10px] text-[0.95rem] font-semibold hover:bg-accent-hover transition-colors"
        >
          Back to Store
        </Link>
      </div>
    </main>
  );
}
