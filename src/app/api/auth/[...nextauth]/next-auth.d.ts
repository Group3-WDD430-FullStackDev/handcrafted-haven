// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"; // This is necessary for type augmentation

declare module "next-auth" {
  interface Session {
    user: {
      id: number | undefined;
      email: string;
      image: string | null;
      displayName: string;
      user_is_seller: boolean;
    };
  }
}
