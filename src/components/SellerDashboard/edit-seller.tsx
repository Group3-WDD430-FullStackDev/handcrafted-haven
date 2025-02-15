"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

  const { update } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    user_bio: bio || "",
    displayName: displayName,
    image: image || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeactivateConfirmationVisible, setDeactivateConfirmationVisible] =
    useState(false);

  // Handle input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  // Handle update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${sellerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      // Redirect after successful update
      router.push(`/dashboard/${sellerId}`);
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
      const response = await fetch(`/api/users/${sellerId}`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Failed to deactivate account");

      await update();
      // Redirect after successful deactivation
      router.push(`/dashboard/${sellerId}/goodbye`);
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

      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <button
          type="button"
          onClick={() => router.push(`/dashboard/${sellerId}`)}
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
          className="bg-handcraftedBlue-400 hover:bg-handcraftedBlue-200 text-black py-2 px-4 rounded"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
}
