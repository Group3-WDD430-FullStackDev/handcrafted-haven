import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      prod_name,
      prod_description,
      prod_price,
      prod_image,
      user_id,
      selectedCategories,
    } = await req.json();

    // Create product entry
    const newProduct = await prisma.products.create({
      data: {
        prod_name,
        prod_description,
        prod_price: parseFloat(prod_price),
        prod_image,
        user_id,
      },
    });

    // Add product categories
    if (selectedCategories && selectedCategories.length > 0) {
      await prisma.product_categories.createMany({
        data: selectedCategories.map((cat_id: number) => ({
          prod_id: newProduct.prod_id,
          cat_id,
        })),
      });
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    let errorMessage: string = "Failed to add product";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ errorMessage }, { status: 500 });
  }
}
