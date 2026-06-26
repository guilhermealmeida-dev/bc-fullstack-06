import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { createError } from "../utils/create-error";

export function requestTypeFileValidator(schema: ZodSchema) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (request.file) {
      const schemaParse = schema.safeParse(request.file);

      if (!schemaParse.success) {
        return next(
          createError(schemaParse.error.errors[0].message, 400)
        );
      }
    }
    return next();
  };
}