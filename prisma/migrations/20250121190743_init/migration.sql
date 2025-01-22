-- CreateEnum
CREATE TYPE "user_type_enum" AS ENUM ('seller', 'customer');

-- CreateTable
CREATE TABLE "categories" (
    "cat_id" SERIAL NOT NULL,
    "cat_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("cat_id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "prod_id" INTEGER NOT NULL,
    "cat_id" INTEGER NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("prod_id","cat_id")
);

-- CreateTable
CREATE TABLE "products" (
    "prod_id" SERIAL NOT NULL,
    "prod_name" VARCHAR(255) NOT NULL,
    "prod_description" TEXT,
    "prod_price" DECIMAL(10,2) NOT NULL,
    "prod_image" VARCHAR(255),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("prod_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "prod_id" INTEGER NOT NULL,
    "review_rating" SMALLINT NOT NULL,
    "review_text" TEXT,
    "review_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "user_bio" TEXT,
    "user_image" VARCHAR(255),
    "user_is_seller" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "categories"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "products"("prod_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "products"("prod_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
