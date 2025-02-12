import EditForm from "@/components/Products/edit-form";
import { getProductById } from "@/app/lib/products/queries";
import { fetchProductCategories } from "@/app/lib/products/queries";
import NotFoundPage from "@/components/Common/NotFound";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  try {
    const product = await getProductById(id);

    if (!product) {
      return <NotFoundPage errorMessage="Product not found" />;
    }

    // Fetch categories
    const categories = await fetchProductCategories();

    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <EditForm categories={categories} product={product} />
      </main>
    );
  } catch (error) {
    console.error(error);
    return <NotFoundPage errorMessage="Failed to load product details" />;
  }
};

export default EditProductPage;
