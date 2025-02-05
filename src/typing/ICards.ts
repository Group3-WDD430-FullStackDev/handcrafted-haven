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
};

export type IProductDetailCard = IProductCard & {
  prod_description: string | null;
  prod_seller_image: string | null;
  prod_reviews: IReview[];
};

export type IReview = {
  id: number;
  comment: string | null;
  author: string;
  author_image: string | null;
  rating: number;
  date: Date | null;
};
