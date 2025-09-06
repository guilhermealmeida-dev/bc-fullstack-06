import { createActivityParticipant, findActivityParticipant } from "../repository/activity-participant-repository";
import { checkActivityExists, countActivities, createActivity, findActivityById, getActiviesUserCreator, getActiviesUserParticipant, getActivitiesPaginatedFilterOrderBy, getParticipantsActivy } from "../repository/activity-repository";
import { getActivityTypes } from "../repository/activity-type-repository";
import { getUserPreferencesTypeIds } from "../repository/preference-repository";
import activityCreation from "../types/activity/activity-creation";
import { AppError } from "../types/error/app-error";
import { giveAchievementService, giveXpService } from "./user-service";
import { randomBytes } from 'crypto';

export async function getActivityTypesService() {
    try {
        return await getActivityTypes();
    } catch (error) {
        throw error;
    }
}

export async function countActivitiesCreatorService(userId: string) {
    try {
        return await countActivities({
            creatorId: userId,
        });
    } catch (error) {
        throw error;
    }
}

export async function countActivitiesParticipantService(userId: string) {
    try {
        return await countActivities({
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

export async function countActivitiesTypeService(userId: string) {
    try {
        return await countActivities({
            typeId: userId,
        });
    } catch (error) {
        throw error;
    }
}

export async function getActivitiesService(userId: string, pageSize: number | undefined, page: number, typeIds: string[], orderByData: { orderBy: string; order: "asc" | "desc" } | undefined) {
    try {
        const isDefined = typeIds[0] === undefined ? false : true;

        if (typeIds[0] === undefined) {
            typeIds = await getUserPreferencesTypeIds(userId);
        }
        
        const activities = await getActivitiesPaginatedFilterOrderBy(pageSize, page, typeIds, isDefined, orderByData);
        const activitiesMap=activities.map(activity => {
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
        const sortedActivities = activitiesMap.sort((a, b) => {
            const aPref = typeIds.includes(a.typeId);
            const bPref = typeIds.includes(b.typeId);

            if (aPref && !bPref) {
                return -1;
            }
            if (!aPref && bPref) {
                return 1;
            }
            return 0;
        });
        return sortedActivities;

    } catch (error) {
        throw error;
    }
}

export async function getActiviesUserCreatorService(userId: string, pageSize: number | undefined, page: number | undefined) {
    try {
        return await getActiviesUserCreator(userId, pageSize, page);
    } catch (error) {
        throw error;
    }
}

export async function getActiviesUserParticipantService(userId: string, pageSize: number | undefined, page: number | undefined) {
    try {
        const activities = await getActiviesUserParticipant(userId, pageSize, page);
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
        const activityExists = await checkActivityExists(activityId);

        if (!activityExists) {
            const erro: AppError = {
                message: "Atividade não encontrada.",
                status: 404,
            };
            throw erro;
        }
        const participants = await getParticipantsActivy(activityId);

        return participants.length > 0 ? participants : [];
    } catch (error) {
        throw error;
    }
}

export async function createActivityService(userId: string, activity: activityCreation) {
    try {
        activity.confirmationCode = await randomBytes(2).toString('hex').toUpperCase();
        const activityData = await createActivity(activity);

        const activities = await getActiviesUserCreator(userId, undefined, undefined);
        if (activities.length === 0) {
            await giveAchievementService(activity.creatorId, "Primeira Atividade Criada",50);
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
    const activity = await findActivityById(activityId);
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
     const userRegistrations = await findActivityParticipant(userId,activityId);
    
     if (!userRegistrations) {
        await giveAchievementService(userId, "Primeira Inscrição", 50); 
    }
 
     // Adiciona XP ao usuário
     await giveXpService(userId, 20);
 
    return await createActivityParticipant(userId, activityId);
}

