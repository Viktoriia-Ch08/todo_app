/*
  Warnings:

  - A unique constraint covering the columns `[verificationCode]` on the table `EmailVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_verificationCode_key" ON "EmailVerification"("verificationCode");
