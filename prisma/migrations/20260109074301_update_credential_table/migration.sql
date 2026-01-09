/*
  Warnings:

  - You are about to drop the column `credentialType` on the `Credential` table. All the data in the column will be lost.
  - Added the required column `type` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "credentialType",
ADD COLUMN     "type" "CredentialType" NOT NULL;
