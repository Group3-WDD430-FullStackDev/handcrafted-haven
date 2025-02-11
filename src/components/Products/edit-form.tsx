"use client";

import { useState } from "react";
import { categories } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IProductDetailCard } from "@/typing/ICards";
import NotFoundPage from "../Common/NotFound";

interface FormProps {
  categories: categories[];
  product: IProductDetailCard;
}

export default function EditForm({ categories, product }: FormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const user_id = session?.user?.id;

  const [formData, setFormData] = useState({
    prod_name: product.prod_name,
    prod_description: product.prod_description || "",
    prod_price: product.prod_price.toString(),
    prod_image: product.prod_image || "",
    selectedCategories: product.prod_categories || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  if (user_id !== product.user_id) {
    return <NotFoundPage errorMessage="Unauthorized access" />;
  }

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle category selection (checkboxes)
  const handleCategoryChange = (cat_id: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(cat_id)
        ? prev.selectedCategories.filter((id) => id !== cat_id)
        : [...prev.selectedCategories, cat_id],
    }));
  };

  // Handle update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.prod_name || !formData.prod_price) {
      setError("Product name and price are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/products/${product.prod_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          prod_price: parseFloat(formData.prod_price),
          categories: formData.selectedCategories,
          user_id,
        }),
      });

      if (!response.ok) throw new Error("Failed to update product");

      // Redirect after successful update
      router.push(`/product/${product.prod_id}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (isDeleteConfirmationVisible) {
      setLoading(true);

      try {
        const response = await fetch(`/api/products/${product.prod_id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete product");

        // Redirect back to seller dashboard after successful deletion
        router.push(`/dashboard/${user_id}`);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setDeleteConfirmationVisible(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name *
        </label>
        <input
          type="text"
          name="prod_name"
          value={formData.prod_name}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="prod_description"
          value={formData.prod_description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price *
        </label>
        <input
          type="number"
          name="prod_price"
          value={formData.prod_price}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          name="prod_image"
          value={formData.prod_image}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <fieldset className="border p-4 rounded-md">
        <legend className="text-sm font-medium text-gray-700">
          Categories
        </legend>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.cat_id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.cat_id}`}
                checked={formData.selectedCategories.includes(category.cat_id)}
                onChange={() => handleCategoryChange(category.cat_id)}
                className="mr-2"
              />
              <label
                htmlFor={`category-${category.cat_id}`}
                className="text-gray-700"
              >
                {category.cat_name}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No categories available.</p>
        )}
      </fieldset>

      {isDeleteConfirmationVisible && (
        <div className="mt-4 p-4 border rounded-md bg-yellow-50 text-yellow-600">
          <p>Are you sure you want to delete this product?</p>
          <div className="mt-2">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md mr-2"
            >
              Yes, Delete
            </button>
            <button
              type="button"
              onClick={() => setDeleteConfirmationVisible(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={router.back}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Cancel
        </button>
        {!isDeleteConfirmationVisible && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete Product
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </div>
    </form>
  );
}
