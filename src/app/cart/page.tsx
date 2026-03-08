"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } =
    useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <main className="max-w-[1100px] mx-auto px-5 py-8 pb-16 w-full">
        <div className="text-center py-16 px-4">
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-muted mb-6">Looks like you haven&apos;t added anything yet.</p>
          <Link
            href="/"
            className="inline-block bg-accent text-white py-3 px-7 rounded-[10px] text-[0.95rem] font-semibold hover:bg-accent-hover transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1100px] mx-auto px-5 py-8 pb-16 w-full">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="grid grid-cols-[1fr_340px] gap-8 items-start max-md:grid-cols-1">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-4 bg-card border border-line rounded-[10px] p-4 max-md:flex-wrap"
            >
              <Link href={`/product/${item.product.id}`}>
                <Image
                  src={item.product.image.url}
                  alt={item.product.image.alt}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </Link>

              <div className="flex-1">
                <Link href={`/product/${item.product.id}`}>
                  <h3 className="text-[0.95rem] font-semibold mb-0.5">{item.product.title}</h3>
                </Link>
                <p className="text-muted text-sm">
                  {item.product.discountedPrice.toFixed(2)} kr
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 border border-line rounded-md overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    className="bg-transparent border-none py-1.5 px-2.5 cursor-pointer text-base text-main hover:bg-surface transition-colors"
                  >
                    −
                  </button>
                  <span className="px-1 text-[0.9rem] min-w-[24px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="bg-transparent border-none py-1.5 px-2.5 cursor-pointer text-base text-main hover:bg-surface transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="bg-transparent border-none text-sale cursor-pointer text-[0.8rem] hover:underline"
                >
                  Remove
                </button>
              </div>

              <div className="font-semibold text-[0.95rem] min-w-[90px] text-right max-md:w-full max-md:text-left max-md:pt-2 max-md:border-t max-md:border-line">
                {(item.product.discountedPrice * item.quantity).toFixed(2)} kr
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-line rounded-[10px] p-6 sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-[0.9rem] text-muted mb-3 pb-3 border-b border-line">
            <span>Items ({totalItems})</span>
            <span>{totalPrice.toFixed(2)} kr</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-5">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)} kr</span>
          </div>
          <button
            onClick={() => router.push("/checkout-success")}
            className="w-full bg-accent text-white border-none py-3.5 rounded-[10px] text-base font-semibold cursor-pointer hover:bg-accent-hover transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
