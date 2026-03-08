import { fetchProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;
  try {
    product = await fetchProduct(id);
  } catch {
    notFound();
  }

  const hasDiscount = product.price > product.discountedPrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      )
    : 0;

  return (
    <main className="max-w-[1100px] mx-auto px-5 py-8 pb-16 w-full">
      <div className="grid grid-cols-2 gap-10 items-start max-md:grid-cols-1 max-md:gap-6">
        <div className="rounded-[10px] overflow-hidden bg-img-bg">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            width={600}
            height={600}
            priority
            className="w-full h-auto block"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          {product.tags.length > 0 && (
            <div className="flex gap-1.5 mb-3 flex-wrap">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-surface border border-line py-0.5 px-2.5 rounded-full text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-muted leading-relaxed mb-5 text-[0.95rem]">
            {product.description}
          </p>

          <div className="flex items-center gap-3 mb-3 flex-wrap">
            {hasDiscount ? (
              <>
                <span className="line-through text-muted text-lg">
                  {product.price.toFixed(2)} kr
                </span>
                <span className="font-bold text-sale text-2xl">
                  {product.discountedPrice.toFixed(2)} kr
                </span>
                <span className="bg-sale text-white text-[0.8rem] font-semibold py-[3px] px-2.5 rounded">
                  Save {discountPercent}%
                </span>
              </>
            ) : (
              <span className="font-bold text-2xl">
                {product.price.toFixed(2)} kr
              </span>
            )}
          </div>

          <div className="flex items-center gap-0.5 mb-6 text-lg">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < product.rating ? "text-star" : "text-star-empty"}
              >
                ★
              </span>
            ))}
            <span className="ml-1.5 text-sm text-muted">({product.rating}/5)</span>
          </div>

          <AddToCartButton product={product} />

          {product.reviews.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-4">Reviews</h2>
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-surface border border-line rounded-[10px] p-4 mb-3"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <strong className="text-[0.9rem]">{review.username}</strong>
                    <span className="text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? "text-star" : "text-star-empty"}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {review.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
