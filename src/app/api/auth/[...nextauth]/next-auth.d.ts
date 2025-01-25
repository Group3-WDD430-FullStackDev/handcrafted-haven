// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"; // This is necessary for type augmentation

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      image: string | null;
      displayName: string;
    };
  }
}
