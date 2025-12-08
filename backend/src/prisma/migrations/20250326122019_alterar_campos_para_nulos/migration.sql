-- AlterTable
ALTER TABLE "Activities" ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "completedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ActivityParticipants" ALTER COLUMN "confirmedAt" DROP NOT NULL;
