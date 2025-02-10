import { products } from "@prisma/client";

type trimmedProduct = Omit<products, "prod_price" | "user_id">;
export interface IProduct extends trimmedProduct {
  prod_price: number;
  user_id: number;
  product_categories: {
    categories: {
      cat_name: string;
      cat_id: number;
    };
  }[];
}
