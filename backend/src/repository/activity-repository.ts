import { Prisma } from "@prisma/client";
import { prisma as prismaClient } from "../prisma/prisma-client";
import activityCreation from "../types/activity/activity-creation";

export async function findActivitiesFilterTypeOrderByPaginatedRepository(
    userId: string,
    pageSize: number | undefined,
    page: number | undefined,
    Ids: string[],
    search: "none" | "typeId" | "preference",
    orderByData: { orderBy?: string; order?: "asc" | "desc" } | undefined
) {
    const where: Prisma.ActivityWhereInput = {
        completedAt: null,
        deletedAt: null,
        creatorId: { not: userId },
        ...(search === "typeId" && Ids.length > 0 && { typeId: { in: Ids } })
    };

    const orderBy: Prisma.Enumerable<Prisma.ActivityOrderByWithRelationInput> = [];

    if (orderByData?.orderBy && orderByData?.order) {
        orderBy.push({ [orderByData.orderBy]: orderByData.order });
    }

    const skip =
        page && pageSize
            ? (page - 1) * pageSize
            : undefined;

    const activities = await prismaClient.activity.findMany({
        take: pageSize,
        skip,
        where,
        orderBy,
        include: {
            activityAddresse: {
                select: { latitude: true, longitude: true }
            },
            user: {
                select: { id: true, name: true, avatar: true }
            },
            ActivityParticipant: {
                where: { aproved: true },
                select: { userId: true }
            }
        }
    });

    if (search === "preference") {
        activities.sort((a, b) => {
            const ai = Ids.indexOf(a.typeId);
            const bi = Ids.indexOf(b.typeId);
            return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
        });
    }

    return activities;
}

export async function findAllActivitiesFilterTypeOrderByRepository(
    userId: string,
    Ids: string[],
    search: "none" | "typeId" | "preference",
    orderByData: { orderBy?: string; order?: "asc" | "desc" } | undefined
) {
    const where: Prisma.ActivityWhereInput = {
        completedAt: null,
        deletedAt: null,
        creatorId: { not: userId },
        ...(search === "typeId" && Ids.length > 0 && { typeId: { in: Ids } })
    };

    const orderBy: Prisma.Enumerable<Prisma.ActivityOrderByWithRelationInput> = [];

    if (orderByData?.orderBy && orderByData?.order) {
        orderBy.push({ [orderByData.orderBy]: orderByData.order });
    }

    const activities = await prismaClient.activity.findMany({
        where,
        orderBy,
        include: {
            activityAddresse: {
                select: { latitude: true, longitude: true }
            },
            user: {
                select: { id: true, name: true, avatar: true }
            },
            ActivityParticipant: {
                where: { aproved: true },
                select: { userId: true }
            }
        }
    });

    if (search === "preference") {
        activities.sort((a, b) => {
            const ai = Ids.indexOf(a.typeId);
            const bi = Ids.indexOf(b.typeId);
            return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
        });
    }

    return activities;
}


export async function countActivitiesRepository(where: Prisma.ActivityWhereInput) {
    return await prismaClient.activity.count({ where });
}

export async function findAllActiviesUserCreatorPaginatedRepository(userId: string, pageSize: number, skip: number | undefined) {
    const activities = await prismaClient.activity.findMany({
        skip: skip,
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

export async function findAllActiviesUserCreatorRepository(userId: string) {
    const activities = await prismaClient.activity.findMany({
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

export async function getActiviesUserParticipantRepository(userId: string, pageSize: number | undefined, page: number | undefined) {
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

export async function getParticipantsActivitityRepository(activityId: string) {
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

export async function checkActivityExistsRepository(activityId: string): Promise<boolean> {
    const activity = await prismaClient.activity.findUnique({
        where: {
            id: activityId,
        },
    });
    return activity !== null;
}

export async function createActivityRepository(activity: activityCreation) {
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

export async function findActivityByIdRepository(activityId: string) {
    return await prismaClient.activity.findUnique({
        where: { id: activityId }
    });
}



