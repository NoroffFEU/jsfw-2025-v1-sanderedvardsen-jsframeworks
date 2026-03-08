import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="max-w-[1100px] mx-auto px-5 py-8 pb-16 w-full">
      <section className="text-center pt-12 pb-10">
        <h1 className="text-3xl font-bold mb-2 max-md:text-2xl">Find something you love</h1>
        <p className="text-muted mb-6 text-lg">Browse our curated collection of products at great prices.</p>
        <SearchBar products={products} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-5">All Products</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 max-md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-md:gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
