"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NotFoundPage from "../Common/NotFound";

export default function EditSellerForm({
  sellerId,
  displayName,
  bio,
  image,
}: {
  sellerId: number;
  displayName: string;
  bio: string | null;
  image: string | null;
}) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const user_id = session?.user?.id;

  const [formData, setFormData] = useState({
    user_bio: bio || "",
    displayName: displayName,
    image: image || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeactivateConfirmationVisible, setDeactivateConfirmationVisible] =
    useState(false);

  // Check if user is authorized before rendering
  if (status === "loading") return <p>Loading...</p>; // Wait for session data
  if (!user_id || user_id !== sellerId)
    return <NotFoundPage errorMessage="Unauthorized access" />;

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log(formData);

    try {
      const response = await fetch(`/api/users/${user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      // Redirect after successful update
      router.push(`/dashboard/${user_id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle account deactivation (with product deletion warning)
  const handleAccountDeactivation = async () => {
    if (!isDeactivateConfirmationVisible) {
      setDeactivateConfirmationVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${user_id}`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Failed to deactivate account");

      await update();
      // Redirect after successful deactivation
      router.push(`/dashboard/${user_id}/goodbye`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
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
        <label className="block text-sm font-medium text-gray-700">
          Display Name *
        </label>
        <input
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="user_bio"
          value={formData.user_bio}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      {isDeactivateConfirmationVisible && (
        <div className="mt-4 p-4 border rounded-md bg-yellow-50 text-yellow-600">
          <p>
            Are you sure you want to deactivate your account? This will delete
            all of your products.
          </p>
          <div className="mt-2">
            <button
              type="button"
              onClick={handleAccountDeactivation}
              className="px-4 py-2 bg-red-600 text-white rounded-md mr-2"
            >
              Yes, Deactivate
            </button>
            <button
              type="button"
              onClick={() => setDeactivateConfirmationVisible(false)}
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
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Cancel
        </button>
        {!isDeactivateConfirmationVisible && (
          <button
            type="button"
            onClick={handleAccountDeactivation}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Deactivate Account
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
}
