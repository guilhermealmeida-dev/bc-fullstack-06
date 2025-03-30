import prismaClient from "../prisma/prisma-client";

export async function getValidActivityTypes() {
    const validTypes = await prismaClient.activityType.findMany({
        select: { id: true },
    });
    return validTypes.map(type => type.id);
}

export async function getActivityTypes() {
    return await prismaClient.activityType.findMany();
}

