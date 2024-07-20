/*
  Warnings:

  - You are about to drop the `createmessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `createmessages` DROP FOREIGN KEY `CreateMessages_userId_fkey`;

-- DropTable
DROP TABLE `createmessages`;

-- CreateTable
CREATE TABLE `RegisterSales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `userId` INTEGER NULL,
    `date` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `monthlyTarget` INTEGER NOT NULL,
    `seller` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RegisterSales` ADD CONSTRAINT `RegisterSales_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `CreateUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
