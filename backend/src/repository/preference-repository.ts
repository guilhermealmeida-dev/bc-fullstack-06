import prismaClient from "../prisma/prisma-client";

export async function getPreferencesById(userId: string) {
    return await prismaClient.activityType.findMany({
        where: {
            Preference: {
                some: {
                    userId: userId,
                },
            },
        },
    });
}

export async function deletePreferencesByUserId(userId: string) {
    return prismaClient.preference.deleteMany({
        where: { userId },
    });
}

export async function createPreferences(preferencesData: { userId: string; typeId: string }[]) {
    return prismaClient.preference.createMany({
        data: preferencesData
    });
}