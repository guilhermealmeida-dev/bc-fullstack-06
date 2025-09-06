import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/payload/userPayload';

export async function jwtTokenGenerate(payload: UserPayload): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET!;
    return jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
}