import { z } from "zod";

export const registerUserValidation = z.object(
    {
        name: z.string(),
        email: z.string().email(),
        cpf: z.string(),
        password: z.string().min(6),
    }
);
