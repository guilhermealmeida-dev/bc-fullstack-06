import prismaClient from "../prisma/prisma-client";

export async function assignAchievementToUser(userId: string, achievementId: string) {
    return await prismaClient.userArchievement.create({
        data: {
            userId: userId,
            archievementId: achievementId
        }
    });
}

export async function hasUserAchieved(userId: string, achievementName: string): Promise<boolean> {
    const existingAchievement = await prismaClient.userArchievement.findFirst({
        where: {
            userId: userId,
            archievement: {
                name: achievementName
            }
        }
    });

    return existingAchievement ? true : false;
}
