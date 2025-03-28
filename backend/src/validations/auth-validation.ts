import { z } from "zod";
const authValidation = z.object(
    {
        email: z.string({ message: "O campo 'email' é obrigatório." }).email({ message: "O e-mail fornecido não é válido" }),
        password: z.string({ message: "O campo 'password' é obrigatório" }).min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    }
);
export default authValidation;

