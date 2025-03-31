import { Prisma } from "@prisma/client";
import prismaClient from "../prisma/prisma-client";
import activityCreation from "../types/activity/activity-creation";

export async function getActivitiesPaginatedFilterOrderBy(
    pageSize: number | undefined,
    page: number | undefined,
    typeIds: string[],
    isDefined: boolean,
    orderByData: { orderBy: string | undefined; order: "asc" | "desc" | undefined } | undefined
) {
    // const offset = pageSize !== undefined && page !== undefined || page > 0? (page - 1) * pageSize : 0;

    const activities = await prismaClient.activity.findMany({
        take: pageSize,
        skip: page,
        where: {
            typeId: isDefined ? { in: typeIds } : undefined,
            completedAt: null,
            deletedAt: null,
        },
        orderBy: orderByData?.orderBy ? { [orderByData.orderBy]: orderByData.order } : undefined,

        include: {
            activityAddresse: {
                select: {
                    latitude: true,
                    longitude: true,
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                }
            },
            ActivityParticipant: {
                where: {
                    aproved: true,
                },
                select: {
                    userId: true
                }
            }
        }
    });

    return activities;

}

export async function countActivities(query: Prisma.ActivityWhereInput) {
    const activities = await prismaClient.activity.findMany({
        where: query,
    });
    return activities.length;
}

export async function getActiviesUserCreator(userId: string, pageSize: number | undefined, page: number | undefined) {
    const activities = await prismaClient.activity.findMany({
        skip: page,
        take: pageSize,
        where: {
            creatorId: userId,
        },
        include: {
            activityAddresse: {
                select: {
                    latitude: true,
                    longitude: true,
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                }
            },
            ActivityParticipant: {
                where: {
                    aproved: true,
                },
                select: {
                    userId: true
                }
            }
        }
    });
    return activities.map(activity => {
        const { ActivityParticipant = [], creatorId, user, activityAddresse, ...activityData } = activity;

        const participantCount = ActivityParticipant.length;

        return {
            ...activityData,
            creator: user,
            address: activityAddresse,
            participantCount
        };
    });
}

export async function getActiviesUserParticipant(userId: string, pageSize: number | undefined, page: number | undefined) {
    return prismaClient.activity.findMany({
        skip: page,
        take: pageSize,
        where: {
            ActivityParticipant: {
                some: {
                    userId: userId,
                }
            }
        },
        include: {
            activityAddresse: {
                select: {
                    latitude: true,
                    longitude: true,
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                }
            },
            ActivityParticipant: {
                where: {
                    aproved: true,
                },
                select: {
                    userId: true,
                }
            }
        }
    });
}

export async function getParticipantsActivy(activityId: string) {
    const participants = await prismaClient.activityParticipant.findMany({
        where: {
            activityId: activityId,
        },
        select: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true
                }
            },
            activityId: true,
            confirmedAt: true
        }
    });
    return participants.map(({ activityId, confirmedAt, user }) => ({
        activityId,
        ...user,
        subscriptionStatus: true,
        confirmedAt

    }));
}

export async function checkActivityExists(activityId: string): Promise<boolean> {
    const activity = await prismaClient.activity.findUnique({
        where: {
            id: activityId,
        },
    });
    return activity !== null;
}

export async function createActivity(activity: activityCreation) {
    const { address, ...activityData } = activity;

    const createdActivity = await prismaClient.activity.create({
        data: {
            ...activityData,
            creatorId: activityData.creatorId, // Usa diretamente creatorId
            activityAddresse: {
                create: {
                    latitude: address.latitude,
                    longitude: address.longitude,
                }
            }
        },
        include: {
            activityAddresse: true,
            user: true // Incluindo os dados do criador corretamente
        }
    });

    return createdActivity;
}

export async function findActivityById(activityId: string) {
    return await prismaClient.activity.findUnique({
        where: { id: activityId }
    });
}



