import prismaClient from "../prisma/prisma-client";

export async function getActivitiesPaginatedFilterOrderBy(
    userId: string,
    pageSize: number,
    page: number,
    typeIds: string[],
    orderByData: { orderBy: string | undefined; order: "asc" | "desc" | undefined } | undefined
) {
    const offset = page > 0 ? (page - 1) * pageSize : 0;
    const activities = await prismaClient.activity.findMany({
        take: pageSize,
        skip: offset,
        where: {
            typeId: { in: typeIds }
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

                select: {
                    userId: true
                }
            }
        }
    });

    return activities.map(activity => {
        const { ActivityParticipant = [], creatorId, user, activityAddresse, ...activityData } = activity; 

        const userSubscriptionStatus = ActivityParticipant.some(participant => participant.userId === userId);

        const participantCount = ActivityParticipant.length;

        return {
            ...activityData,
            creator: user,
            address: activityAddresse,
            userSubscriptionStatus,
            participantCount
        };
    });
    
}

export async function getActivitiesFilterOrderBy(
    userId: string,
    typeId: string | undefined,
    orderByData: { orderBy: string | undefined; order: "asc" | "desc" | undefined } | undefined
) {
    const activities = await prismaClient.activity.findMany({
        where: {
            typeId: typeId,
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
                select: {
                    userId: true
                }
            }
        }
    });

    return activities.map(activity => {
        const { ActivityParticipant = [], creatorId, user, activityAddresse, ...activityData } = activity; 

        const userSubscriptionStatus = ActivityParticipant.some(participant => participant.userId === userId);

        const participantCount = ActivityParticipant.length;

        return {
            ...activityData,
            creator: user,
            address: activityAddresse,
            userSubscriptionStatus,
            participantCount
        };
    });
}

export async function countActivities(typeId: string | undefined) {
    return (await prismaClient.activity.findMany({
        where: {
            typeId: typeId
        }
    })).length;
}



