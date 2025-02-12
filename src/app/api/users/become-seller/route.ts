import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(session?.user?.id);
  try {
    const updatedUser = await prisma.users.update({
      where: { user_id: session.user.id },
      data: { user_is_seller: true },
    });

    return NextResponse.json({ success: true, userId: updatedUser.user_id });
  } catch (error) {
    let errorMessage: string = "Failed to make user a seller";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ errorMessage }, { status: 500 });
  }
}
