// File: app/api/review/route.ts
import { NextResponse } from "next/server";
import { addUpdateReview } from "@/app/lib/products/reviews/mutations";
import { getReviewByUserProdKey } from "@/app/lib/products/reviews/queries";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const prod_id = url.searchParams.get("prod_id");

    if (!prod_id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }
    //Fetch all reviews for the given product
    const reviews = await getReviewByUserProdKey(parseInt(prod_id));

    const transformedReviews = reviews.map((review) => ({
      ...review,
      author_name: review.users?.displayName || "",
      author_image: review.users?.image || null,
    }));

    return NextResponse.json(transformedReviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const review = await req.json(); // Get review data from request body
    console.log(review);

    const updatedReview = await addUpdateReview(review);

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}
