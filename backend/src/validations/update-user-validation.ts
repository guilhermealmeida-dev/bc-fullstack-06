import { z } from "zod";
const updateUserValidation = z.object(
    {
        name: z.string().optional(),
        email: z.string().email({ message: "O e-mail fornecido não é válido" }).optional(),
        password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }).optional(),
    }
).strict();
export default updateUserValidation;