import prismaClient from '../prisma/prisma-client';
import userCriation from '../types/user/user-creation';
import userUpdate from '../types/user/user-data-update';

export async function getById(userId: string) {
    return await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            UserArchievement: true,

        },
        omit: {
            deletedAt: true,
        }
    });
}

export async function getIsActiveById(userId: string): Promise<boolean> {
    const user = await prismaClient.user.findUnique({
        where: { id: userId },
        select: { deletedAt: true },
    });
    return user ? user.deletedAt === null : false;
}

export async function getByEmail(email: string) {
    return await prismaClient.user.findUnique({
        where: {
            email: email,
        },
        include: {
            UserArchievement: true,
        },
    });
}

export async function create(data: userCriation) {
    return await prismaClient.user.create({
        data: data
    });
}

export async function uploadProfile(path: string, userId: string) {
    return await prismaClient.user.update({
        data: {
            avatar: path
        },
        where: {
            id: userId,
        },
    });
}

export async function update(data: userUpdate, id: string) {
    return await prismaClient.user.update({
        data: data,
        where: {
            id,
        },
    });
}

