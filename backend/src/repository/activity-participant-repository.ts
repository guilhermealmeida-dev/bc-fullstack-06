import { prisma as prismaClient } from "../prisma/prisma-client";

export async function findActivityParticipant(userId: string, activityId: string) {
    return await prismaClient.activityParticipant.findFirst({
        where: {
            userId,
            activityId
        }
    });
}

export async function createActivityParticipant(userId: string, activityId: string, aproved: boolean, confirmedAt: Date | null) {
    return await prismaClient.activityParticipant.create({
        data: {
            userId,
            activityId,
            aproved: aproved,
            confirmedAt: confirmedAt
        }
    });
}

export async function deleteActivityParticipant(id: string) {
    return await prismaClient.activityParticipant.delete({
        where: {
            id: id
        }
    });
}

export async function updateActivityParticipant(activityParticipantId: string, aproved: boolean) {
    await prismaClient.activityParticipant.update({
        where: { id: activityParticipantId },
        data: {
            aproved: aproved,
        }
    });
}