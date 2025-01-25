const users = [
  {
    googleId: "fake-google-id-12345",
    email: "email@example.com",
    displayName: "John Doe",
    image: "image.jpg",
    //   user_id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa", // Assigned by DB with Prisma Model
    // user_email: "email@example.com",
    // user_password: "password123",
    // user_name: "John Doe",
    user_bio: "Biography text",
    user_is_seller: false,
    // user_image: "image.jpg",
  },
  {
    googleId: "fake-google-id-23456",
    email: "seller@example.com",
    displayName: "Jane Doe",
    image: "image.jpg",
    //   user_id: "11111111-1111-1111-1111-111111111111", // Assigned by DB with Prisma Model
    // user_email: "seller@example.com",
    // user_password: "password123",
    // user_name: "Jane Doe",
    user_bio: "Biography text",
    user_is_seller: true,
    // user_image: "image.jpg",
  },
];

const products = [
  {
    //   prod_id: "aaaaaaaa-1111-1111-1111-111111111111", // Assigned by DB with Prisma Model
    prod_name: "Blue Handbag",
    prod_description: "Lovely little bag with strap.",
    prod_price: 19.99,
    prod_image: "bag.jpg",
    //   user_id: "11111111-1111-1111-1111-111111111111", // Using user_name when seeding, since ID doesn't exist yet
    user_name: "Jane Doe",
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
