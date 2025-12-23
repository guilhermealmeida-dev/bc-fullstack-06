import { Prisma } from "@prisma/client";
import { createActivityParticipant, findActivityParticipant } from "../repository/activity-participant-repository";
import { checkActivityExistsRepository, countActivitiesRepository, createActivityRepository, findActivityByIdRepository, getActiviesUserCreatorRepository, getActiviesUserParticipantRepository, getActivitiesAllFilterTypeOrderByRepository, getActivitiesPaginatedFilterTypeOrderByRepository, getParticipantsActivitityRepository } from "../repository/activity-repository";
import { getActivityTypes } from "../repository/activity-type-repository";
import activityCreation from "../types/activity/activity-creation";
import { AppError } from "../types/error/app-error";
import { giveAchievementService, giveXpService } from "./user-service";
import { randomBytes } from 'node:crypto';
import { getPreferencesByIdRepository } from "../repository/preference-repository";

export async function getActivityTypesService() {
    return await getActivityTypes();
}

export async function countActivitiesCreatorService(userId: string) {
    try {
        return await countActivitiesRepository({
            creatorId: userId,
        });
    } catch (error) {
        throw error;
    }
}

export async function countActivitiesParticipantService(userId: string) {
    try {
        return await countActivitiesRepository({
            ActivityParticipant: {
                some: {
                    userId: userId,
                }
            }
        });
    } catch (error) {
        throw error;
    }
}

export async function countActivitiesTypeService(typeIds: string[] | null) {
    const where: Prisma.ActivityWhereInput = {};

    if (typeIds && typeIds.length > 0) {
        where.typeId = { in: typeIds };
    }

    return await countActivitiesRepository(where);
}

export async function getActivitiesPaginatedFilterOrderByService(
    userId: string,
    pageSize: number | undefined,
    page: number,
    typeIds: string[],
    preferences: string[] | null,
    orderByData: { orderBy: string; order: "asc" | "desc" } | undefined) {

    let search: "none" | "preference" | "typeId";
    let Ids: string[] = [];

    if (typeIds && typeIds.length > 0) {
        search = "typeId";
        Ids = typeIds;
    } else if (preferences && preferences.length > 0) {
        search = "preference";
        Ids = preferences;
    } else {
        search = "none";
        Ids = [];
    }

    const activities = await getActivitiesPaginatedFilterTypeOrderByRepository(
        userId,
        pageSize,
        page,
        Ids,
        search,
        orderByData
    );

    const activitiesMap = activities.map(activity => {
        const { ActivityParticipant = [], confirmationCode, creatorId, user, activityAddresse, deletedAt, completedAt, ...activityData } = activity;

        const userSubscriptionStatus = ActivityParticipant.some(participant => participant.userId === userId);

        const participantCount = ActivityParticipant.length;

        return {
            ...activityData,
            participantCount,
            creator: user,
            address: activityAddresse,
            userSubscriptionStatus,
        };
    });

    return activitiesMap;
}

export async function getActivitiesAllFilterTypeOrderByService(userId: string, typeId: string, orderByData: { orderBy: string; order: "asc" | "desc" } | undefined) {
    let search: "none" | "preference" | "typeId";
    let Ids: string[] = [];

    if (typeId) {
        search = "typeId";
        Ids.push(typeId);
    } else {
        const preferences = await getPreferencesByIdRepository(userId);

        if (preferences && preferences.length > 0) {
            search = "preference";
            Ids = preferences.map(e => e.id);
        } else {
            search = "none";
            Ids = [];
        }
    }

    const activities = await getActivitiesAllFilterTypeOrderByRepository(
        userId,
        Ids,
        search,
        orderByData
    );

    const activitiesMap = activities.map(activity => {

        const { ActivityParticipant = [], confirmationCode, creatorId, user, activityAddresse, deletedAt, completedAt, ...activityData } = activity;

        const userSubscriptionStatus = ActivityParticipant.some(participant => participant.userId === userId);

        const participantCount = ActivityParticipant.length;

        return {
            ...activityData,
            participantCount,
            creator: user,
            address: activityAddresse,
            userSubscriptionStatus,
        };
    });

    return activitiesMap;
}

export async function getActiviesUserCreatorService(userId: string, pageSize: number, page: number) {
    const skip =
        page && pageSize
            ? (page - 1) * pageSize
            : undefined;

    return await getActiviesUserCreatorRepository(userId, pageSize, skip);
}

export async function getActiviesUserParticipantService(userId: string, pageSize: number | undefined, page: number | undefined) {
    try {
        const activities = await getActiviesUserParticipantRepository(userId, pageSize, page);
        return activities.map(activity => {
            const { ActivityParticipant = [], confirmationCode, creatorId, user, activityAddresse, ...activityData } = activity;

            const userSubscriptionStatus = ActivityParticipant.some(participant => participant.userId === userId);

            const participantCount = ActivityParticipant.length;

            return {
                ...activityData,
                ...(creatorId === userId ? { confirmationCode } : {}),
                participantCount,
                creator: user,
                address: activityAddresse,
                userSubscriptionStatus,

            };
        });
    } catch (error) {
        throw error;
    }
}

export async function getParticipantsActivyService(activityId: string) {
    try {
        const activityExists = await checkActivityExistsRepository(activityId);

        if (!activityExists) {
            const erro: AppError = {
                message: "Atividade não encontrada.",
                status: 404,
            };
            throw erro;
        }
        const participants = await getParticipantsActivitityRepository(activityId);

        return participants.length > 0 ? participants : [];
    } catch (error) {
        throw error;
    }
}

export async function createActivityService(userId: string, activity: activityCreation) {
    try {
        activity.confirmationCode = await randomBytes(2).toString('hex').toUpperCase();
        const activityData = await createActivityRepository(activity);

        const activities = await getActiviesUserCreatorRepository(userId, 0, 0);
        if (activities.length === 0) {
            await giveAchievementService(activity.creatorId, "Primeira Atividade Criada", 50);
        }

        await giveXpService(activity.creatorId, 20);

        return {
            id: activityData.id,
            title: activityData.title,
            description: activityData.description,
            typeId: activityData.typeId,
            image: activityData.image,
            address: {
                latitude: activityData.activityAddresse?.latitude,
                longitude: activityData.activityAddresse?.longitude
            },
            sheduledDate: activityData.sheduledDate,
            createdAt: activityData.createdAt,
            completedAt: activityData.completedAt,
            private: activityData.private,
            creator: activityData.user
                ? {
                    id: activityData.user.id,
                    name: activityData.user.name,
                    avatar: activityData.user.avatar
                }
                : null,
        };
    } catch (error) {
        throw error;
    }
}

export async function registerUserInActivityService(userId: string, activityId: string) {
    const activity = await findActivityByIdRepository(activityId);
    if (!activity) {
        const erro: AppError = { message: "Atividade não encontrada.", status: 404 };
        throw erro;
    }

    if (activity.creatorId === userId) {
        const erro: AppError = { message: "O criador da atividade não pode se inscrever.", status: 400 };
        throw erro;
    }

    const existingParticipant = await findActivityParticipant(userId, activityId);
    if (existingParticipant) {
        const erro: AppError = { message: "Você já se registrou nesta atividade.", status: 400 };
        throw erro;
    }

    if (activity.completedAt) {
        const erro: AppError = { message: "Não é possível se inscrever em uma atividade concluída.", status: 400 };
        throw erro;
    }
    const userRegistrations = await findActivityParticipant(userId, activityId);

    if (!userRegistrations) {
        await giveAchievementService(userId, "Primeira Inscrição", 50);
    }

    // Adiciona XP ao usuário
    await giveXpService(userId, 20);

    return await createActivityParticipant(userId, activityId);
}

