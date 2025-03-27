import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getById, getIsActiveById, update, uploadProfile } from "../repository/user-repository";
import userDataUpdate from "../types/user/user-data-update";
import bcrypt from "bcryptjs";
import { ErrorRequest } from "../types/error/error-request";
export async function getUser(id: string) {
    try {
        const user = await getById(id);

        if (!user) {
            const erro: ErrorRequest = {
                message: "Usuário não encontrado",
                status: 404,
            };
            throw erro;
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export async function findUserIsActive(id: string) {
    try {
        return await getIsActiveById(id);
    } catch (error) {
        throw error;
    }
}

export async function uploadUserProfile(path: string, userId: string) {
    try {
        await uploadProfile(path, userId);
    } catch (error: any) {

        throw error;
    }
}

export async function updateUser(data: userDataUpdate, id: string) {
    try {
        const user = await getUser(id);
        const { cpf, level, xp, ...allowedData } = data;
        if (allowedData.password) {
            allowedData.password = await bcrypt.hash(allowedData.password, 10);
        }
        const updatedUser = await update(allowedData, id);
        const { deletedAt, ...userWithoutDeletedAt } = updatedUser;
        return userWithoutDeletedAt;

    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
            const erro: ErrorRequest = {
                message: "O e-mail informado já pertence a outro usuário",
                status: 409,
            }
            throw erro;
        }
        throw error;
    }
}
