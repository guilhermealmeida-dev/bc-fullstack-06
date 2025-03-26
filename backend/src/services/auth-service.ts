import { create, getByEmail } from "../repository/user-repository";
import {
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import userCriation from "../types/user/user-creation";
import authData from "../types/user/auth-data";

export async function createUser(data: userCriation) {
    try {
        return await create(data);
    } catch (error: any) {
        if (error instanceof PrismaClientValidationError) {
            error.message = "Dados Inválidos ou faltando!";
            (error as any).status = 400;
            throw error;
        } else if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            error.message = "Email ou CPF já estão sendo utilizados!";
            (error as any).status = 409;
            throw error;
        }

        throw error;
    }
}

export async function login(data: authData) {
    try {
        const user = await getByEmail(data.email);
        if (!user) {
            const error = new Error("Usuário não encontrado");
            (error as any).status = 404;
            throw error;
        }
        if (data.password !== user.password) {
            const error = new Error("Senha inválida");
            (error as any).status = 401;
            throw error;
        }
        return user;
    } catch (error: any) {
        throw error;
    }
}
