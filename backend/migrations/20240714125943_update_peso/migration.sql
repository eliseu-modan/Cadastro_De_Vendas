/*
  Warnings:

  - Added the required column `Peso` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `Peso` VARCHAR(191) NOT NULL;
