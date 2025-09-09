import jwt from 'jsonwebtoken';
import { AuthJwtPayload } from '../types/payload/userPayload';

export async function jwtTokenGenerate(payload: AuthJwtPayload): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET!;
    return jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
}