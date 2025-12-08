import {prisma as prismaClient} from "../prisma/prisma-client";

export async function findValidActivityTypes() {
    const validTypes = await prismaClient.activityType.findMany({
        select: { id: true },
    });
    return validTypes.map(type => type.id);
}

export async function getActivityTypes() {
    return prismaClient.activityType.findMany();
}


