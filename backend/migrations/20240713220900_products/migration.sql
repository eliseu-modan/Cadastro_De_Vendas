-- AlterTable
ALTER TABLE `products` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `CreateUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
