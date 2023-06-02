/*
  Warnings:

  - You are about to drop the column `email` on the `emails` table. All the data in the column will be lost.
  - You are about to drop the column `files_id` on the `emails` table. All the data in the column will be lost.
  - You are about to drop the column `emails_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_destiny]` on the table `emails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailsId` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_destiny` to the `emails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `emails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "emails" DROP CONSTRAINT "emails_files_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_emails_id_fkey";

-- DropIndex
DROP INDEX "emails_email_key";

-- DropIndex
DROP INDEX "users_user_name_key";

-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "emailsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "emails" DROP COLUMN "email",
DROP COLUMN "files_id",
ADD COLUMN     "email_destiny" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN     "usersId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emails_id",
DROP COLUMN "user_name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "emails_email_destiny_key" ON "emails"("email_destiny");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_emailsId_fkey" FOREIGN KEY ("emailsId") REFERENCES "emails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
