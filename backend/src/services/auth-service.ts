import { create, findByEmail, findByCpf } from "../repository/user-repository";
import { AuthRegister } from "../types/auth/auth-register";
import { AuthLogin } from "../types/auth/auth-login";
import bcrypt from "bcryptjs";
import { createError } from "../utils/create-error";

export async function register(data: AuthRegister) {

    const error = createError("O e-mail ou CPF informado já pertence a outro usuário.", 409);

    const existingByEmail = await findByEmail(data.email);
    if (existingByEmail) throw error;

    const existingByCpf = await findByCpf(data.cpf);
    if (existingByCpf) throw error;

    const encriptedPassword = await bcrypt.hash(data.password, 10);

    const userToCreate: AuthRegister = {
        ...data,
        password: encriptedPassword,
        avatar: `${process.env.SERVER_URL}:${process.env.PORT}/public/images/profile.jpeg`
    }

    return create(userToCreate);
}

export async function login(data: AuthLogin) {

    const userDb = await findByEmail(data.email);
    if (!userDb) throw createError("Usuário não encontrado.", 404);
    if (userDb.deletedAt) throw createError("Esta conta foi desativada e não pode ser utilizada.", 403);

    const isValidPassword = await bcrypt.compare(data.password, userDb.password);
    if (!isValidPassword) throw createError("Senha incorreta", 401);

    const { password,deletedAt, ...user } = userDb;

    return user;
}
