import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { findUserIsActive } from '../services/user-service';
import { AppError } from '../types/error/app-error';
const jwtSecret = process.env.JWT_SECRET!;

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export default async function authGuard(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    const error: AppError = {
      message: "Autenticação necessária",
      status: 401,
    };
    return next(error);
  }

  try {
    const decoded = jwt.verify(authHeader, jwtSecret) as JwtPayload;
    request.userId = decoded.id as string;
    try {
      const isActive = await findUserIsActive(request.userId);
      if (!isActive) {
        const error: AppError = {
          message: "Esta conta foi desativada e não pode ser utilizada",
          status: 403,
        };
        return next(error);
      }
    } catch (dbError: any) {
      return next({status:500});
    }
    next();
  } catch (error: any) {
    const errorResponse: AppError = {
      message: 'Token inválido ou expirado',
      status: 401,
    };
    return next(errorResponse);
  }
}
