import {prisma as prismaClient} from "../prisma/prisma-client";
import { Archievement } from "../types/achievement/archievement";

export async function assignAchievementToUser(userId: string, achievementId: string) {
    return await prismaClient.userArchievement.create({
        data: {
            userId: userId,
            archievementId: achievementId
        }
    });
}

export async function findArchivementUser(
  userId: string, 
  achievementName: string
): Promise<Archievement | null> {
  const existingAchievement = await prismaClient.userArchievement.findFirst({
    where: {
      userId,
      archievement: {
        name: achievementName
      }
    },
    select: {
      archievement: true
    }
  });

  return existingAchievement ? existingAchievement.archievement : null;
}
