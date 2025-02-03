const users = [
  {
    // user_id: 6
    googleId: "fake-google-id-23456",
    email: "seller@example.com",
    displayName: "Jane Doe",
    image: "/users/jane-doe.jpg",
    user_bio:
      "I love making handbags. I have been creating designs since I was 12.",
    user_is_seller: true,
  },
  {
    // user_id: 7
    googleId: "fake-google-id-12345",
    email: "email@example.com",
    displayName: "John Doe",
    image: "/users/john-doe.jpg",
    user_bio:
      "Ceramics are my life. My shop is full of creative, hand painted designs. All my products are non-toxic and food safe.",
    user_is_seller: true,
  },
  {
    // user_id: 1
    googleId: "fake-google-id-11111",
    email: "buyer@email.com",
    displayName: "Betty Buyer",
    image: "image.jpg",
    user_bio: "",
    user_is_seller: false,
  },
];

const products = [
  {
    //   prod_id: "aaaaaaaa-1111-1111-1111-111111111111", // Assigned by DB with Prisma Model
    prod_name: "Blue Handbag",
    prod_description: "Lovely little bag made of leather.",
    prod_price: 19.99,
    prod_image: "/products/blue-bag.jpg",
    //   user_id: "11111111-1111-1111-1111-111111111111", // Using user_name when seeding, since ID doesn't exist yet
    user_name: "Jane Doe",
  },
  {
    //   prod_id: "baaaaaaa-1111-1111-1111-111111111111", // Assigned by DB with Prisma Model
    prod_name: "Black Handbag",
    prod_description: "Leather bag with gold clasps.",
    prod_price: 49.99,
    prod_image: "/products/black-bag.jpg",
    //   user_id: "11111111-1111-1111-1111-111111111111", // Using user_name when seeding, since ID doesn't exist yet
    user_name: "Jane Doe",
  },
  {
    //   prod_id: "baaaaaaa-1111-1111-1111-111111111111", // Assigned by DB with Prisma Model
    prod_name: "Coffee Mugs",
    prod_description: "Set of 2 brown ceramic mugs",
    prod_price: 12.99,
    prod_image: "/products/brown-mugs.jpg",
    //   user_id: "11111111-1111-1111-1111-111111111111", // Using user_name when seeding, since ID doesn't exist yet
    user_name: "John Doe",
  },
];

const categories = [
  {
    //   cat_id: "cccccccc-1111-1111-1111-111111111111", // Assigned by DB with Prisma Model
    cat_name: "accessories",
  },
  {
    //   cat_id: "cccccccc-2222-1111-1111-111111111111", // Assigned by DB with Prisma Model
    cat_name: "pottery",
  },
];

const productCategories = [
  {
    //   prod_id: "aaaaaaaa-1111-1111-1111-111111111111", // Using prod_name when seeding, since ID doesn't exist yet
    prod_name: "Blue Handbag",
    //   cat_id: "cccccccc-1111-1111-1111-111111111111", // Using cat_name when seeding, since ID doesn't exist yet
    cat_name: "accessories",
  },
];

const reviews = [
  {
    //   review_id: "bbbbbbbb-1111-1111-1111-111111111111", // Assigned by DB with Prisma Model
    review_rating: 4,
    review_text: "Great handbag! I love it.",
    review_date: "2025-06-01", // YYYY-MM-DD
    // user_id: "11111111-1111-1111-1111-111111111111",// Using user_name when seeding, since ID doesn't exist yet
    user_name: "Jane Doe",
    // prod_id: "aaaaaaaa-1111-1111-1111-111111111111",// Using prod_name when seeding, since ID doesn't exist yet
    prod_name: "Blue Handbag",
  },
];
export { users, products, categories, productCategories, reviews };
