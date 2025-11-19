/*
  Warnings:

  - Added the required column `actors` to the `WatchlistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `WatchlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchlistItem" ADD COLUMN     "actors" TEXT NOT NULL,
ADD COLUMN     "director" TEXT NOT NULL;
