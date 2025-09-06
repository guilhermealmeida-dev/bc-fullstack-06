import prismaClient from '../prisma/prisma-client';
import { AuthRegister } from '../types/auth/auth-register';
import userUpdate from '../types/user/user-data-update';

export async function getById(userId: string) {
    return prismaClient.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            archievements: true,

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

export async function findByEmail(email: string) {
    return prismaClient.user.findUnique({
        where: {
            email: email,
        },
        include: {
            archievements: true,
        },
    });
}

export async function findByCpf(cpf: string) {
    return prismaClient.user.findUnique(
        {
            where: {
                cpf: cpf,
            }
        }
    );
}

export async function create(data: AuthRegister) {
    return prismaClient.user.create({
        data: data
    });
}

export async function uploadProfile(path: string, userId: string) {
    return prismaClient.user.update({
        data: {
            avatar: path
        },
        where: {
            id: userId,
        },
    });
}

export async function update(data: userUpdate, userId: string) {
    return prismaClient.user.update({
        data: data,
        where: {
            id: userId,
        },
    });
}

export async function desactiveAcaunt(userId: string) {
    const currentDate = new Date().toISOString();
    return prismaClient.user.update({
        data: {
            deletedAt: currentDate,
        },
        where: {
            id: userId,
        }
    });
}




