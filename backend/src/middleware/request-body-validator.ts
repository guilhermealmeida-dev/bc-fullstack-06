import { Request, Response, NextFunction } from "express";
import { json } from "stream/consumers";
import { ZodError, ZodSchema } from "zod";

export default function requestBodyValidator(schema: ZodSchema) {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            schema.parse(request.body);
            next();
        } catch (error) {
            response.status(400).send({ error: "Informe os campos obrigatórios corretamente" });
        }
    }
}



