// Category type
export type Category = {
  cat_id: number;
  cat_name: string;
};

// User type
export type User = {
  user_id: number;
  googleId: string;
  email: string;
  displayName: string;
  image: string;
  createdAt: Date;
  user_bio: string | null;
  user_is_seller: boolean | null;
};
