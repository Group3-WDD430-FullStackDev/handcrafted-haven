import Form from "@/components/Products/create-form";
import { fetchProductCategories } from "@/app/lib/products/queries";

export default async function CreateProductPage() {
  // Fetch categories
  const categories = await fetchProductCategories();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Product</h1>

      {/* Pass onCancel to allow returning to the previous page */}
      <Form categories={categories} />
    </main>
  );
}
