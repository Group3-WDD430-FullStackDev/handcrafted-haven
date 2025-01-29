import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";

console.log("NextAuth handler is being loaded");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
