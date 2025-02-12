import { IReviewWithUser } from "./IReview";

export type IUserCard = {
  user_id: number;
  displayName: string;
  user_bio: string;
  image: string;
};

export type IProductCard = {
  prod_id: number;
  prod_name: string;
  prod_price: number;
  prod_image: string | null;
  user_id: number;
};

export type IProductDetailCard = IProductCard & {
  prod_description: string | null;
  prod_seller_id: number | null;
  prod_seller_image: string | null;
  prod_reviews: IReviewWithUser[];
  prod_categories: number[]; // array of category ids
};
