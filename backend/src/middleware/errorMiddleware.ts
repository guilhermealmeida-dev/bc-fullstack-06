import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(err);


    const statusCode = err.status || 500;
    const error = statusCode === 500 ? "Erro inesperado" : err.message;

    res.status(statusCode).json({
        error,
        errors: err.errors || undefined,
    });
}

