import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

//Update seller profile (PUT)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user_id = await parseInt((await params).id); // Convert id from string to number
    if (isNaN(user_id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    // Get the session
    const session = await getServerSession(authOptions);
    //  const session = await getSessionFromRequest(req);

    if (!session || session.user.id !== user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { user_bio, displayName, image } = await req.json();

    const updatedUser = await prisma.users.update({
      where: { user_id },
      data: {
        user_bio,
        displayName,
        image,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// Deactive seller status and delete all connected products
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user_id = await parseInt((await params).id); // Convert id from string to number
    if (isNaN(user_id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Get the session
    const session = await getServerSession(authOptions);

    if (!session || session.user.id !== user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Start a transaction to delete the user's products, categories, and reviews
    await prisma.$transaction([
      // Delete product categories associated with the user's products
      prisma.product_categories.deleteMany({
        where: {
          prod_id: {
            in: await prisma.products
              .findMany({ where: { user_id }, select: { prod_id: true } })
              .then((products) => products.map((p) => p.prod_id)),
          },
        },
      }),

      // Delete reviews associated with the user's products
      prisma.reviews.deleteMany({
        where: {
          prod_id: {
            in: await prisma.products
              .findMany({ where: { user_id }, select: { prod_id: true } })
              .then((products) => products.map((p) => p.prod_id)),
          },
        },
      }),

      // Delete all products associated with the user
      prisma.products.deleteMany({
        where: { user_id },
      }),

      // Update user to set user_is_seller to false
      prisma.users.update({
        where: { user_id },
        data: {
          user_is_seller: false,
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Seller account deactivated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deactivating seller account:", error);
    return NextResponse.json(
      { error: "Failed to deactivate seller account" },
      { status: 500 }
    );
  }
}
