import prismaClient from "../prisma/prisma-client";

export async function getValidActivityTypes() {
    const validTypes = await prismaClient.activityType.findMany({
        select: { id: true },
    });
    return validTypes.map(type => type.id);
}