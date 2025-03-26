import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(err);

    if (err instanceof PrismaClientInitializationError) {
        err.message = 'Erro ao conectar com o banco de dados.';
        (err as any).status = 500;
    } else if (err instanceof PrismaClientKnownRequestError) {
        err.message = err.message || 'Erro desconhecido do Prisma.';
        (err as any).status = 400;
    }
    const statusCode = err.status || 500;
    const message = err.message || 'Erro interno do servidor';

    res.status(statusCode).json({
        message,
        errors: err.errors || undefined,
    });
}

