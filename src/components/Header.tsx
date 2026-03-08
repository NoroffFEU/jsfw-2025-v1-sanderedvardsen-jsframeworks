"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-line">
      <div className="max-w-[1100px] mx-auto px-5 h-[60px] flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-accent">
          ShopNest
        </Link>
        <nav className="flex items-center gap-6 text-[0.95rem]">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
          <Link href="/cart" className="relative flex items-center hover:text-accent transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-sale text-white text-[0.7rem] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
