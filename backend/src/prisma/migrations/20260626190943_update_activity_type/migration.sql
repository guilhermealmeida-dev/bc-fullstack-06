/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ActivityTypes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActivityTypes_name_key" ON "ActivityTypes"("name");
