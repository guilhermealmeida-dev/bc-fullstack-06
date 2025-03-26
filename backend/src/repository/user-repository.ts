import prismaClient from '../prisma/prisma-client';
import userCriation from '../types/user/user-creation';
import userData from '../types/user/user-update';

export async function getById(id: string) {
    return await prismaClient.user.findUnique({
        where: {
            id: id,
        },
        include: {
            UserArchievement: false,
        },
    });
}
export async function getByEmail(email: string) {
    return await prismaClient.user.findUnique({
        where: {
            email: email,
        },
    });
}

export async function create(data: userCriation) {
    return await prismaClient.user.create({
        data: {
            ...data,
            avatar: 'Avatarzinho',
        },
    });
}
    
export async function update(data: userData, id: string) {
    return await prismaClient.user.update({
        data: data,
        where: {
            id,
        },
    });
}

