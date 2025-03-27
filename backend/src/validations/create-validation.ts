import { z } from "zod";
const createValidation = z.object(
    {
        name: z.string({ message: "O campo 'name' é obrigatório" }),
        email: z.string({ message: "O campo 'email' é obrigatório." }).email({ message: "O e-mail fornecido não é válido" }),
        cpf: z.string({ message: "O campo 'cpf' é obrigatório" }).length(11, { message: "O CPF deve ter 11 digitos" }),
        password: z.string({ message: "O campo 'password' é obrigatório" }).min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    }
).strict();
export default createValidation;