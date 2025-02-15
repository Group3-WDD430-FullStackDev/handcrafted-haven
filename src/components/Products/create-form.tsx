"use client";

import { useState } from "react";
import { categories } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NotFoundPage from "../Common/NotFound";

interface FormProps {
  categories: categories[];
}

export default function Form({ categories }: FormProps) {
  const [formData, setFormData] = useState({
    prod_name: "",
    prod_description: "",
    prod_price: "",
    prod_image: "",
    selectedCategories: [] as number[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const user_id = session?.user?.id;

  if (status === "loading") {
    return <p>Loading...</p>; // Show a placeholder instead of unauthorized page
  }

  if (!user_id) {
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

  // Handle form submission
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
      const response = await fetch("/api/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          prod_price: parseFloat(formData.prod_price),
          user_id,
        }),
      });

      if (!response.ok) throw new Error("Failed to add product");

      // Redirect or reset form after success
      setFormData({
        prod_name: "",
        prod_description: "",
        prod_price: "",
        prod_image: "",
        selectedCategories: [],
      });

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label htmlFor="prod_name" className="block text-sm font-medium text-gray-700">
          Product Name *
        </label>
        <input
          type="text"
          id="prod_name"
          name="prod_name"
          value={formData.prod_name}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="prod_description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="prod_description"
          name="prod_description"
          value={formData.prod_description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="prod_price" className="block text-sm font-medium text-gray-700">
          Price *
        </label>
        <input
          type="number"
          id="prod_price"
          name="prod_price"
          value={formData.prod_price}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="prod_image" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          id="prod_image"
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

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => router.push(`/dashboard/${user_id}`)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-handcraftedBlue-400 hover:bg-handcraftedBlue-200 text-black py-2 px-4 rounded"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
    </form>
  );
}
