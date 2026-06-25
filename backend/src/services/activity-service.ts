import { Prisma } from "@prisma/client";
import { createActivityParticipant, deleteActivityParticipant, findActivityParticipant, updateActivityParticipant, updateConfirmedAtActivityParticipant } from "../repository/activity-participant-repository";
import { checkActivityExistsRepository, countActivitiesRepository, createActivityRepository, findActivityByIdRepository, findAllActiviesUserCreatorPaginatedRepository, findAllActiviesUserCreatorRepository, findActiviesUserParticipantPaginatedRepository, findAllActivitiesFilterTypeOrderByRepository, findActivitiesFilterTypeOrderByPaginatedRepository, getParticipantsActivitityRepository, findAllActiviesUserParticipantRepository, deleteActivityByIdRepository, updateActivityRepository } from "../repository/activity-repository";
import { findActivityTypeById, getActivityTypes } from "../repository/activity-type-repository";
import Activity from "../types/activity/activity-creation";
import { giveAchievementService, giveXpService } from "./user-service";
import { getPreferencesByIdRepository } from "../repository/preference-repository";
import { createError } from "../utils/create-error";
import { OptionsAchievements } from "../types/achievement/archievement";
import { formatSubscriptionStatus } from "../utils/format-subscription-status";
import ActivityUpdate from "../types/activity/activity-update";

export async function getActivityTypesService() {
    return await getActivityTypes();
}

export async function countActivitiesCreatorService(userId: string) {

    return await countActivitiesRepository({
        creatorId: userId,
    });

}

export async function countActivitiesParticipantService(userId: string) {

    return await countActivitiesRepository({
        ActivityParticipant: {
            some: {
                userId: userId,
            }
        }
    });

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

    const activities = await findActivitiesFilterTypeOrderByPaginatedRepository(
        userId,
        pageSize,
        page,
        Ids,
        search,
        orderByData
    );

    const activitiesMap = activities.map(activity => {
        const { ActivityParticipant = [], confirmationCode, creatorId, user, activityAddresse, deletedAt, completedAt, ...activityData } = activity;

        const userSubscriptionStatus = formatSubscriptionStatus(ActivityParticipant[0]?.aproved);

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

    const activities = await findAllActivitiesFilterTypeOrderByRepository(
        userId,
        Ids,
        search,
        orderByData
    );

    const activitiesMap = activities.map(activity => {

        const { ActivityParticipant = [], confirmationCode, creatorId, user, activityAddresse, deletedAt, completedAt, ...activityData } = activity;

        const userSubscriptionStatus = formatSubscriptionStatus(ActivityParticipant[0]?.aproved);


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

export async function getAllActiviesUserCreatorPaginatedService(userId: string, pageSize: number, page: number) {
    const skip =
        page && pageSize
            ? (page - 1) * pageSize
            : undefined;

    return await findAllActiviesUserCreatorPaginatedRepository(userId, pageSize, skip);
}

export async function getAllActiviesUserCreatorService(userId: string) {

    return await findAllActiviesUserCreatorRepository(userId);
}

export async function getActiviesUserParticipantPaginatedService(userId: string, pageSize: number | undefined, page: number | undefined) {

    const activities = await findActiviesUserParticipantPaginatedRepository(userId, pageSize, page);
    return activities.map(activity => {
        const { ActivityParticipant: ActivityParticipants = [], confirmationCode, creatorId, user, activityAddresse, ...activityData } = activity;

        const userSubscriptionStatus = formatSubscriptionStatus(ActivityParticipants[0]?.aproved);

        const participantCount = ActivityParticipants.length;

        return {
            ...activityData,
            ...(creatorId === userId ? { confirmationCode } : {}),
            participantCount,
            creator: user,
            address: activityAddresse,
            userSubscriptionStatus,

        };
    });

}

export async function getAllActiviesUserParticipantService(userId: string) {
    const activities = await findAllActiviesUserParticipantRepository(userId);

    return activities.map(activity => {
        const { ActivityParticipant = [], confirmationCode, creatorId, user, activityAddresse, ...activityData } = activity;

        const userSubscriptionStatus = formatSubscriptionStatus(ActivityParticipant[0].aproved);

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
}

export async function getParticipantsActivyService(activityId: string) {

    const activityExists = await checkActivityExistsRepository(activityId);

    if (!activityExists) {
        throw createError("Atividade não encontrada.", 404);
    }
    const participants = await getParticipantsActivitityRepository(activityId);

    return participants.map(participant => {
        return {
            id: participant.id,
            userId: participant.user.id,
            name: participant.user.name,
            avatar: participant.user.avatar,
            subscriptionStatus: formatSubscriptionStatus(participant.aproved),
            confirmedAt: participant.confirmedAt
        }
    });
}

export async function createActivityService(activity: Activity) {
    const activityData = await createActivityRepository(activity);

    const activities = await findAllActiviesUserCreatorRepository(activity.creatorId);
    if (activities.length === 0) {
        await giveAchievementService(activity.creatorId, OptionsAchievements.FIRST_ACTIVITY_CREATED, 50);
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
}

export async function removeActivityService(activityId: string, userId: string) {
    const activity = await findActivityByIdRepository(activityId);
    if (!activity || activity.deletedAt) {
        throw createError("Atividade não encontrada!", 404);
    }

    if (activity.creatorId !== userId) {
        throw createError("Apenas o criador da atividade pode exclui-la.", 409);
    }

    await deleteActivityByIdRepository(activityId);
}

//Atualizar atividade
export async function editActivityService(activityId: string, userId: string, activityData: ActivityUpdate) {
    const activity = await findActivityByIdRepository(activityId);

    if (!activity || activity.deletedAt) {
        throw createError("Atividade não encontrada!", 404);
    }

    if (activity.creatorId !== userId) {
        throw createError("Apenas o criador da atividade pode editala.", 409);
    }

    if (activity.typeId) {
        const activityType = await findActivityTypeById(activity.typeId);
        if (!activityType) {
            throw createError("Tipo de atividade não existe.", 409);
        }
    }

    return await updateActivityRepository(activityId, activityData);
}

export async function registerUserInActivityService(userId: string, activityId: string) {
    const activity = await findActivityByIdRepository(activityId);
    if (!activity) {
        throw createError("Atividade não encontrada.", 404);
    }

    if (activity.creatorId === userId) {
        throw createError("O criador da atividade não pode se inscrever.", 400);
    }

    const existingParticipant = await findActivityParticipant(userId, activityId);
    if (existingParticipant) {
        throw createError("Você já se registrou nesta atividade.", 409);
    }

    if (activity.completedAt) {
        throw createError("Não é possível se inscrever em uma atividade concluída.", 400);
    }

    const userRegistrations = await getAllActiviesUserParticipantService(userId);
    if (!userRegistrations) {
        await giveAchievementService(userId, OptionsAchievements.FIRST_INSCRIPTION, 50);
    } else {
        // Adiciona XP ao usuário
        await giveXpService(userId, 20);
    }

    let confirmedAt: Date | null = activity.private ? null : new Date();
    let aproved: boolean = activity.private ? false : true;

    return await createActivityParticipant(userId, activityId, aproved, confirmedAt);
}

//Carcelar inscrição do usuário 
export async function removeSubscriptionInActivityService(userId: string, activityId: string) {
    const activity = await findActivityByIdRepository(activityId);
    if (!activity) {
        throw createError("Atividade não encontrada.", 404);
    }

    const activityParticipant = await findActivityParticipant(userId, activityId);
    if (!activityParticipant) {
        throw createError("Você não se inscreveu nesta atividade.", 400);
    }
    if (activityParticipant.confirmedAt) {
        throw createError("Não é possível cancelar sua inscrição, pois sua presença já foi confirmada.", 409);
    }

    await deleteActivityParticipant(activityParticipant.id);
}

//Concluir uma atividade
export async function concludeActivityService(activityId: string, userId: string) {
    const activity = await findActivityByIdRepository(activityId);
    if (!activity) {
        throw createError("Atividade não encontrada.", 404);
    }

    if (activity.creatorId !== userId) {
        throw createError("Apenas o criador pode concluí-la.", 403)
    }

    await updateActivityRepository(activityId, { completedAt: new Date() });
}

//Aprovar uma inscrição
export async function aproveSubsctiption(userId: string, activityId: string, participantId: string) {
    const activity = await findActivityByIdRepository(activityId);
    const activityParticipant = await findActivityParticipant(participantId, activityId);

    //participante se increveu?
    if (!activityParticipant) {
        throw createError("Não foi encontrada uma inscrição", 404);
    }

    //atividade existe?
    if (!activity || activity.deletedAt) {
        throw createError("Atividade não encontrada", 404);
    }

    //é o criador?
    if (activity.creatorId !== userId) {
        throw createError("Apenas o criador pode aprovar um participante", 403);
    }

    //já foi concluida?
    if (activity.completedAt) {
        throw createError("A atividade já foi encerrada", 403);
    }

    await updateActivityParticipant(activityParticipant.id, activityParticipant.aproved ? false : true);
}

// Fazer check-in em uma atividade
export async function check_in(userId: string, activityId: string, code: string) {
    const activity = await findActivityByIdRepository(activityId);
    const subscription = await findActivityParticipant(userId, activityId);
    console.log(subscription);

    if (!subscription) throw createError("Inscrição não encontrada", 404);
    if (!activity) throw createError("Atividade não encontrada", 404);
    if (subscription.confirmedAt) throw createError("Você já confirmou sua participação nesta atividade", 409);
    if (activity.completedAt) throw createError("Não é possível confirmar presença em uma atividade concluída", 409);
    if (!subscription.aproved) throw createError("Apenas participantes aprovados na atividade podem fazer check-in", 403);
   
    if (code !== activity.confirmationCode) throw createError("Código de confirmação incorreto", 400);

    await updateConfirmedAtActivityParticipant(subscription.id);
}