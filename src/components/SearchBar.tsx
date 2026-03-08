"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types";

interface SearchBarProps {
  products: Product[];
}

export default function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = query.length > 0
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // close the dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-[440px] mx-auto" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full py-3 px-4 border border-line rounded-[10px] text-[0.95rem] bg-card outline-none transition-colors duration-200 focus:border-accent"
      />
      {isOpen && filtered.length > 0 && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-card border border-line rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-50 max-h-[280px] overflow-y-auto">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex justify-between py-2.5 px-4 text-[0.9rem] border-b border-line last:border-b-0 transition-colors duration-150 hover:bg-surface"
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
            >
              <span>{product.title}</span>
              <span className="text-muted text-sm">
                {product.discountedPrice.toFixed(2)} kr
              </span>
            </Link>
          ))}
        </div>
      )}
      {isOpen && query.length > 0 && filtered.length === 0 && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-card border border-line rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-50">
          <p className="p-4 text-center text-muted text-[0.9rem]">No products found</p>
        </div>
      )}
    </div>
  );
}
