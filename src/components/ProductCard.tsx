import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.price > product.discountedPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-card rounded-[10px] overflow-hidden border border-line flex flex-col transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="relative aspect-square overflow-hidden bg-img-bg">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
        {hasDiscount && (
          <span className="absolute top-2.5 left-2.5 bg-sale text-white text-[0.78rem] font-semibold py-[3px] px-2 rounded">
            -{discountPercent}%
          </span>
        )}
      </div>
      <div className="p-3.5 pb-4 flex flex-col gap-1 flex-1 max-sm:p-2.5 max-sm:pb-3">
        <h3 className="text-base font-semibold max-sm:text-sm">{product.title}</h3>
        <div className="flex gap-px text-[0.9rem]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < product.rating ? "text-star" : "text-star-empty"}>
              ★
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {hasDiscount ? (
            <>
              <span className="line-through text-muted text-sm">{product.price.toFixed(2)} kr</span>
              <span className="font-semibold text-sale text-base">{product.discountedPrice.toFixed(2)} kr</span>
            </>
          ) : (
            <span className="font-semibold text-base">{product.price.toFixed(2)} kr</span>
          )}
        </div>
      </div>
    </Link>
  );
}
