// app/products/[id]/page.js
import ProductInfo from "@/components/ProductInfo";

export default async function ProductInfoPage({ params }) {
  // Awte, bis die params verfügbar sind
  const { id } = await Promise.resolve(params);
  return <ProductInfo productId={id} />;
}
