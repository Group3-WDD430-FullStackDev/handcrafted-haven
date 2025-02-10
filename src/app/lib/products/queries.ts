import { prisma } from "@/app/lib/prisma";
import { categories } from "@prisma/client";
import { IProductCard, IProductDetailCard } from "@/typing/ICards";
import { Decimal } from "@prisma/client/runtime/library";
import { IProduct } from "@/typing/IProduct";
import IFilterParams from "@/typing/IFilterParams";

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
        include: { users: true },
      },
      product_categories: {
        select: {
          cat_id: true,
        },
      },
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

  const mappedCategories = product.product_categories.map(
    (prodCat) => prodCat.cat_id
  );

  return {
    prod_id: product.prod_id,
    prod_name: product.prod_name,
    prod_price: product.prod_price.toNumber(),
    prod_image: product.prod_image || null,
    prod_description: product.prod_description || null,
    prod_seller_id: product.user_id,
    prod_seller_image: product.users.image || null,
    prod_reviews: mappedReviews,
    prod_categories: mappedCategories,
    user_id: product.user_id,
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
        user_id: number;
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

// Constant for number of products to display per page
const PRODUCTS_PER_PAGE = 30;

/*
 * Fetches the number of pages for the product catalog
 * @param {string} filters - The filters to apply to the query
 * @returns {Promise<number>} The number of pages
 */
export async function fetchProductPages(
  filters: IFilterParams
): Promise<number> {
  // getWhereClause is a helper function to get the where clause for the query
  const whereClause = getWhereClause(filters);

  // query the database for the products
  const data = await prisma.products.findMany({
    select: {
      prod_id: true,
    },
    where: whereClause,
  });

  // return the number of pages
  return Math.ceil(data.length / PRODUCTS_PER_PAGE);
}

/*
 * Fetches the products for the product catalog
 * @param {string} page - The current page number
 * @param {string} filters - The filters to apply to the query
 * @returns {Promise<IProduct[]>} The products
 */
export async function fetchProducts(
  page: number,
  filters: IFilterParams
): Promise<IProduct[]> {
  // offfset is the number of products to skip
  const offset = page * PRODUCTS_PER_PAGE;

  // getWhereClause is a helper function to get the where clause for the query
  const whereClause = getWhereClause(filters);

  // query the database for the products
  const rawdata = await prisma.products.findMany({
    select: {
      prod_id: true,
      prod_name: true,
      prod_description: true,
      prod_price: true,
      prod_image: true,
      product_categories: {
        select: {
          categories: {
            select: {
              cat_name: true,
              cat_id: true,
            },
          },
        },
      },
      user_id: true,
    },
    where: whereClause,
    skip: offset,
    take: PRODUCTS_PER_PAGE,
  });

  // convert from Decimal to number because Decimal is not JSON serializable
  const data = rawdata.map((x) => ({
    ...x,
    prod_price: Number(x.prod_price),
  }));

  // return the products
  return data;
}

/*
 * Fetches the filter categories for the catalog page
 * @returns {Promise<categories[]>} The categories
 */
export async function fetchProductCategories(): Promise<categories[]> {
  const data = await prisma.categories.findMany({});

  return data;
}

// Helper function to get the where clause for the query
function getWhereClause(filters: IFilterParams) {
  const whereClause: {
    product_categories?: object;
    user_id?: object;
  } = {};

  if ("Category" in filters && filters.Category) {
    const categoryFilters = filters.Category?.split(",").map((x) => +x);
    whereClause.product_categories = {
      some: {
        categories: {
          cat_id: {
            in: categoryFilters,
          },
        },
      },
    };
  }
  if ("Seller" in filters && filters.Seller) {
    const sellerFilters = filters.Seller?.split(",").map((x) => +x);
    whereClause.user_id = {
      in: sellerFilters,
    };
  }
  return whereClause;
}
