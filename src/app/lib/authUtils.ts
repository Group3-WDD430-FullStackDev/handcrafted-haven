import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth"; // Your NextAuth config

export async function getSessionUserId(): Promise<number | null> {
  const session = await getServerSession(authOptions);
  return session?.user?.id ? Number(session.user.id) : null;
}
