import { prisma } from "@/app/lib/prisma";
import { products } from "@prisma/client";
import { IProductCard, IProductDetailCard } from "@/typing/ICards";
import { Decimal } from "@prisma/client/runtime/library";

export async function getProductById(
  id: string
): Promise<IProductDetailCard | null> {
  const product = await prisma.products.findUnique({
    where: {
      prod_id: parseInt(id),
    },
    include: {
      users: true,
      reviews: {
        include: {users: true}
      }
    },
  });

  if (!product) return null;

  // Map the reviews to match the IProductDetailCard structure
  const mappedReviews = product.reviews.map((review) => ({
    id: review.review_id,
    comment: review.review_text || "",
    author: review.users.displayName,
    author_image: review.users.image || null,
    rating: review.review_rating,
    date: review.review_date,
  }));

  return {
    prod_id: product.prod_id,
    prod_name: product.prod_name,
    prod_price: product.prod_price.toNumber(),
    prod_image: product.prod_image || null,
    prod_description: product.prod_description || null,
    prod_seller_image: product.users.image || null,
    prod_reviews: mappedReviews,
  };
}

export async function fetchFeaturedProducts(): Promise<IProductCard[]> {
  return new Promise(async (resolve) => {
    // setTimeout(async () => {
    // queryRaw is used because Prisma doesn't support server-side randomization
    const products = await prisma.$queryRaw<
      {
        prod_id: number;
        prod_name: string;
        prod_image: string | null;
        prod_price: Decimal;
      }[]
    >`SELECT prod_id, prod_name, prod_image, prod_price FROM products ORDER BY RANDOM() LIMIT 3`;

    resolve(
      products.map((product) => ({
        ...product,
        // convert from Decimal to number
        prod_price: Number(product.prod_price),
        prod_image: product.prod_image ?? "", // Handle potential null values
      }))
    );
    // }, 1000);
  });
}

const PRODUCTS_PER_PAGE = 10;
export async function fetchProductPages(): Promise<number> {
  let data = await prisma.products.findMany({});

  //Testing: create 90 products
  data = createMultiple(90, data);
  return data.length / PRODUCTS_PER_PAGE;
}

export async function fetchProducts(page: number): Promise<products[]> {
  const offset = page * PRODUCTS_PER_PAGE;
  let data = await prisma.products.findMany({});

  // Testing: creates products
  data = createMultiple(PRODUCTS_PER_PAGE, data, offset);

  return data;
}

// For testing
// Creates (length) number of products for testing the pagination feature
function createMultiple(
  length: number,
  data: products[],
  offset: number = 0
): products[] {
  return Array.from({ length: length }, (_, i: number) => ({
    ...data[0],
    prod_name: "Handbag " + (i + offset).toString(),
  })).flat();
}
