import { Request, Response, NextFunction } from "express";

export function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {

    const statusCode = error.status || 500;
    const errorMessage = statusCode === 500 ? "Erro inesperado." : error.message;

    response.status(statusCode).json({
        error: errorMessage,
    });
}

