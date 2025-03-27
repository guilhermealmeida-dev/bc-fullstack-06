import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { findUserIsActive } from '../services/user-service';
import { ErrorRequest } from '../types/error/error-request';
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
    const error: ErrorRequest = {
      message: "É preciso estar autenticado para acessar esse endpoint",
      status: 401,
    };
    return next(error);
  }

  try {
    const decoded = jwt.verify(authHeader, jwtSecret) as JwtPayload;
    request.userId = decoded.id as string;
    const isActive = await findUserIsActive(request.userId);
    if (!isActive) {
      const error: ErrorRequest = {
        message: "Esta conta foi desativada e não pode ser utilizada",
        status: 403,
      };
      return next(error);
    }
    next();
  } catch (error: any) {
    const errorResponse: ErrorRequest = {
      message: 'Token inválido ou expirado',
      status: 401,
    };
    return next(errorResponse);
  }
}
