/*
  Warnings:

  - Added the required column `code` to the `RegisterSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `registersales` ADD COLUMN `code` INTEGER NOT NULL;
