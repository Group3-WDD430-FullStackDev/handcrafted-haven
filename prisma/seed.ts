import { PrismaClient } from "@prisma/client";
import {
  users,
  products,
  categories,
  productCategories,
  reviews,
} from "./placeholder-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Insert Users and Capture Generated IDs
  const createdUsers = await Promise.all(
    users.map(async (user) => {
      return prisma.users.create({
        data: user,
      });
    })
  );

  // Create a map of user_name -> ID
  const userMap = new Map(
    createdUsers.map((user) => [user.user_name, user.user_id])
  );

  // Insert Categories and Capture Generated IDs
  const createdCategories = await Promise.all(
    categories.map(async (category) => {
      return prisma.categories.create({
        data: category,
      });
    })
  );

  // Create a map of category name -> ID
  const categoryMap = new Map(
    createdCategories.map((category) => [category.cat_name, category.cat_id])
  );

  // Insert Products and Capture Generated IDs
  const createdProducts = await Promise.all(
    products.map(async (product) => {
      const userId = userMap.get(product.user_name);
      if (!userId) {
        console.warn(
          `User "${product.user_name}" not found. Skipping product "${product.prod_name}".`
        );
        return null;
      }

      return prisma.products.create({
        data: {
          prod_name: product.prod_name,
          prod_description: product.prod_description,
          prod_price: product.prod_price,
          prod_image: product.prod_image,
          user_id: userId, // Ensured not undefined
        },
      });
    })
  );

  // Create a map of product name -> ID (filtering out nulls)
  const productMap = new Map(
    createdProducts
      .filter(Boolean)
      .map((product) => [product!.prod_name, product!.prod_id])
  );

  // Insert Product-Category Relationships
  await Promise.all(
    productCategories.map(async (pc) => {
      const prodId = productMap.get(pc.prod_name);
      const catId = categoryMap.get(pc.cat_name);

      if (!prodId || !catId) {
        console.warn(
          `Skipping product-category relation: ${pc.prod_name} -> ${pc.cat_name}`
        );
        return;
      }

      return prisma.product_categories.create({
        data: {
          prod_id: prodId,
          cat_id: catId,
        },
      });
    })
  );

  // Insert Reviews
  await Promise.all(
    reviews.map(async (review) => {
      const userId = userMap.get(review.user_name);
      const prodId = productMap.get(review.prod_name);

      if (!userId || !prodId) {
        console.warn(
          `Skipping review: ${review.user_name} on ${review.prod_name}`
        );
        return;
      }

      return prisma.reviews.create({
        data: {
          review_rating: review.review_rating,
          review_text: review.review_text,
          review_date: new Date(review.review_date),
          user_id: userId, // Ensured not undefined
          prod_id: prodId, // Ensured not undefined
        },
      });
    })
  );

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
