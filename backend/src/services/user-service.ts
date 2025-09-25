import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { desactiveAcaunt, findByEmail, findById, update } from "../repository/user-repository";
import userDataUpdate from "../types/user/user-data-update";
import bcrypt from "bcryptjs";
import { AppError } from "../types/error/app-error";
import { createPreferences, deletePreferencesById, getPreferencesById } from "../repository/preference-repository";
import { findValidActivityTypes } from "../repository/activity-type-repository";
import { assignAchievementToUser, hasUserAchieved } from "../repository/user-archievement-repository";
import { findAchievementByName } from "../repository/archievement-repository";
import { createError } from "../utils/create-error";

export async function getUser(id: string) {

    const userDb = await findById(id);

    const { password, deletedAt, ...safeUser } = userDb!;

    return safeUser;
}


export async function getUserPreferences(userId: string) {
    const preferences = (await getPreferencesById(userId)).map((preference) => ({
        typeId: preference.id,
        typeName: preference.name,
        typeDescription: preference.description,
    }));
    return preferences;
}

export async function defineUserPreferences(preferences: string[], userId: string) {

    const validTypeIds = await findValidActivityTypes();
    const invalidType = preferences.find(typeId => !validTypeIds.includes(typeId));

    if (invalidType) {
        throw createError("Um ou mais IDs são inválidos.", 400);
    }

    const preferencesData = preferences.map((typeId) => ({
        userId,
        typeId,
    }));

    await deletePreferencesById(userId);
    await createPreferences(preferencesData);
}

export async function updateUser(data: userDataUpdate, id: string) {

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    if (data.email) {
        const user = await findByEmail(data.email);
        if (user) {
            throw createError("Email já esta cadastrado", 400);
        }
    }

    const { deletedAt, ...updatedUser } = await update(data, id);

    return updatedUser;
}

export async function desactiveUserAcaunt(userId: string) {
    try {
        return await desactiveAcaunt(userId);
    } catch (error) {
        throw error;
    }
}

export async function giveXpService(userId: string, xpToAdd: number) {
    const user = await findById(userId);

    const newXp = user!.xp + xpToAdd;

    let newLevel = user!.level;
    if (newXp >= 1000) {
        newLevel += 1;
    }
    const updatedUser = await update({ xp: newXp, level: newLevel }, userId);

    return updatedUser;
}

export async function giveAchievementService(userId: string, achievementName: string, xp: number) {
    const existingAchievement = await hasUserAchieved(userId, achievementName);

    if (existingAchievement) {
        throw { status: 500 };
    }

    const achievement = await findAchievementByName(achievementName);

    if (!achievement) {
        throw { status: 500 };
    }

    await assignAchievementToUser(userId, achievement.id);
    await giveXpService(userId, xp);
    return achievement;
}
