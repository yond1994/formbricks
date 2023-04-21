-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('postHog', 'slack', 'zapier');

-- CreateEnum
CREATE TYPE "IntegrationTrigger" AS ENUM ('displayCreated', 'responseCreated');

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "environmentId" TEXT NOT NULL,
    "type" "IntegrationType" NOT NULL,
    "config" JSONB NOT NULL,
    "triggers" "IntegrationTrigger"[],

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Integration_environmentId_type_key" ON "Integration"("environmentId", "type");

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
