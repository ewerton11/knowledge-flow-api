-- AlterTable
ALTER TABLE `Topic` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isChecked` BOOLEAN NOT NULL DEFAULT false;
