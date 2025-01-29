import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile) {
        console.error("Profile is missing!");
        return false;
      }

      // Upsert the user in the database
      await prisma.users.upsert({
        where: { googleId: user.id },
        update: {
          email: user.email!,
          displayName: profile.name || "Unknown",
          image: user.image || "",
        },
        create: {
          googleId: user.id,
          email: user.email!,
          displayName: profile.name || "Unknown",
          image: user.image || "",
        },
      });

      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        const dbUser = await prisma.users.findUnique({
          where: { googleId: token.sub },
        });

        if (dbUser) {
          session.user.id = dbUser.user_id; // Add the user ID to the session
        }
      }
      console.log("auth.ts [Session]", session);
      return session;
    },
  },
};
