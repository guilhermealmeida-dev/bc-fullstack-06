import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { createError } from '../utils/create-error';
import { AuthJwtPayload } from '../types/payload/userPayload';
import { findById } from '../repository/user-repository';
declare module 'express-serve-static-core' {
  interface Request {
    payload?: AuthJwtPayload;
  }
}

export default async function authGuard(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET!;

  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return next(createError("Autenticação necessária", 401));
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthJwtPayload;

    request.payload = {
      id: decoded.id,
      email: decoded.email,
    }

    const user = await findById(decoded.id);

    if (user) {
      if (user?.deletedAt !== null) {
        return next(createError("Esta conta foi desativada e não pode ser utilizada", 403));
      }
    } else {
      return next(createError("Autenticação necessária", 401));
    }

    return next();
  } catch (error: any) {
    if (error instanceof JsonWebTokenError) {
      return next(createError("Autenticação necessária", 401));
    }
    next(error);
  }
}
