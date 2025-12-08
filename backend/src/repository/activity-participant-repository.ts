import {prisma as prismaClient} from "../prisma/prisma-client";

export async function findActivityParticipant(userId: string, activityId: string) {
    return await prismaClient.activityParticipant.findFirst({
        where: {
            userId,
            activityId
        }
    });
}


export async function createActivityParticipant(userId: string, activityId: string) {
    return await prismaClient.activityParticipant.create({
        data: {
            userId,
            activityId,
            aproved: false, // Inscrição pendente de aprovação
            confirmedAt: null
        }
    });
}