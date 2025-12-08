import {prisma as prismaClient} from "../prisma/prisma-client";

export async function getPreferencesById(userId: string) {
    const preferences = await prismaClient.preference.findMany({
        where: {
            userId,
        },
        select: {
            activityType: true,
        },
    });

    return preferences.map((preference) => preference.activityType);
}

export async function getUserPreferencesTypeIds(userId: string) {
    const preferences = await prismaClient.preference.findMany({
        where: { userId },
        select: { typeId: true },
    });
    return preferences.map(preference => preference.typeId);
}

export async function deletePreferencesById(userId: string) {
    return prismaClient.preference.deleteMany({
        where: { userId },
    });
}

export async function createPreferences(preferencesData: { userId: string; typeId: string }[]) {
    return prismaClient.preference.createMany({
        data: preferencesData
    });
}