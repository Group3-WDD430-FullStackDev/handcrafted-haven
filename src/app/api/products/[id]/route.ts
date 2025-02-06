import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// Update a product (PUT)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const prod_id = parseInt(params.id); // Convert id from string to number
      const { prod_name, prod_description, prod_price, prod_image, categories } = await req.json();
  
      const updatedProduct = await prisma.products.update({
        where: { prod_id },
        data: {
          prod_name,
          prod_description,
          prod_price: parseFloat(prod_price),
          prod_image,
          product_categories: {
            deleteMany: {}, // Remove all previous categories
            create: categories.map((cat_id: number) => ({ cat_id })), // Add new categories
          },
        },
      });
  
      return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
      console.error("Error updating product:", error);
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
  }

  // Delete a product and all associated reviews and product_categories records
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const prod_id = parseInt(params.id);

    // Delete all product-category relationships
    await prisma.product_categories.deleteMany({
      where: { prod_id },
    });

    // Delete all reviews related to this product
    await prisma.reviews.deleteMany({
      where: { prod_id },
    });

    // Delete the product itself
    await prisma.products.delete({
      where: { prod_id },
    });

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
