import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET!;

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export default function authGuard(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response
      .status(401)
      .send('É preciso estar autenticado para acessar esse endpoint');
    return;
  }
  try {
    const user = jwt.verify(authHeader, jwtSecret) as JwtPayload;
    request.userId = user.id as string;
    next();
  } catch (error: any) {
    response.status(401).send('Token inválido ou expirado');
    return;
  }
}
