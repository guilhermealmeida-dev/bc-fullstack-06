import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { createError } from "../utils/create-error";

export function requestBodyValidator(schema: ZodSchema) {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            const schemaParse = schema.safeParse(request.body);
            if (!schemaParse.success) throw createError("Informe os campos obrigatórios corretamente", 400);
            request.body = schemaParse.data;
            return next();
        } catch (error) {
            return next(error);
        }
    }
}



