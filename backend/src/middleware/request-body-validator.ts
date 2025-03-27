import {Request, Response, NextFunction} from "express";
import { ZodError, ZodSchema } from "zod";

export default function requestBodyValidator(schema:ZodSchema) {
    return (request:Request, response:Response,next: NextFunction)=>{
        try {
            schema.parse(request.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((err) => err.message);
                response.status(400).json({ errors: errorMessages });
            } else {
                response.status(400).send("Informe os campos corretamente!");
            }
        }
    }
}



