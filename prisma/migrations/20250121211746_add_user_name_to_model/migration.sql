/*
  Warnings:

  - Added the required column `user_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_name" VARCHAR(255) NOT NULL;
