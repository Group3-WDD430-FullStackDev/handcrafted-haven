import React from "react";
import { getProductById } from "@/app/lib/products/queries";
import ProductDetailCard from "@/components/Cards/ProductDetailsCard";
import NotFoundPage from "@/components/Common/NotFound";

// This is a placeholder component, made to test the handleClick function in the card component
const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return <NotFoundPage errorMessage="Product not found" />;
  }

  // Layout based on https://tailwindflex.com/@dika99/product-details-page
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <ProductDetailCard product={product} />
    </div>
  );
};

export default ProductPage;
