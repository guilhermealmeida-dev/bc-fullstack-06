import { create, getByEmail } from "../repository/user-repository";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import userCriation from "../types/user/user-creation";
import authData from "../types/user/auth-data";
import bcrypt from "bcryptjs";
import { ErrorRequest } from "../types/error/error-request";

export async function createUser(data: userCriation) {
    try {
        const encriptedPassworf = await bcrypt.hash(data.password, 10);
        data.password = encriptedPassworf;
        return await create(data);
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
            const erro: ErrorRequest = {
                message: "O e-mail ou CPF informado já pertence a outro usuário",
                status: 409
            };
            throw erro;
        }
        throw error;
    }
}

export async function login(data: authData) {
    try {
        const user = await getByEmail(data.email);
        if (!user) {
            const erro: ErrorRequest = {
                message: "Usuário não encontrado",
                status: 404
            };
            throw erro;
        }
        if (user.deletedAt != null) {
            const erro: ErrorRequest = {
                message: "Esta conta foi desativada e não pode ser utilizada",
                status: 403
            };
            throw erro;
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);

        if (!isValidPassword) {
            const erro: ErrorRequest = {
                message: "Senha incorreta",
                status: 401
            };
            throw erro;
        }
        return user;
    } catch (error: any) {
        throw error;
    }
}
