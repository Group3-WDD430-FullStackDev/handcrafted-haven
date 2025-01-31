import { prisma } from "@/app/lib/prisma";
import { products } from "@prisma/client";

export async function fetchFeaturedProducts(): Promise<products[]> {
  const data = await prisma.products.findMany({
    take: 3,
  });
  return createMultiple(3, data);
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
