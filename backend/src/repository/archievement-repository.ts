import {prisma as prismaClient} from "../prisma/prisma-client";

export async function findAchievementByName(achievementName: string) {
    const achievement = await prismaClient.archievement.findFirst({
        where: {
            name: achievementName
        }
    });

    return achievement; 
}