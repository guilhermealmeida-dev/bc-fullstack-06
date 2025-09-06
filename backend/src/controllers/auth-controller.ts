import { Express, Router, Request, Response, NextFunction } from 'express';
import { login, register } from '../services/auth-service';
import { loginUserValidation } from '../validations/login-user-validation';
import { requestBodyValidator } from '../middlewares/request-body-validator';
import { registerUserValidation } from '../validations/register-user-validation';
import { AuthRegister } from '../types/auth/auth-register';
import { jwtTokenGenerate } from '../utils/jwt-token-generate';

export function authController(server: Express) {
    const router = Router();

    router.post('/register',
        requestBodyValidator(registerUserValidation),
        async (request: Request, response: Response, next: NextFunction) => {
            const userData: AuthRegister = request.body;
            try {
                await register(userData);
                response.status(201).json({ message: "Usuário criado com sucesso." });
                return;
            } catch (error: any) {
                return next(error);
            }
        });

    router.post('/sign-in',
        requestBodyValidator(loginUserValidation),
        async (request: Request, response: Response, next: NextFunction) => {
            try {
                const { email, password } = request.body;
                const user = await login({ email, password });
                const token = await jwtTokenGenerate({ id: user.id, email: user.email })
                response.status(200).json({ token: token, ...user });
                return;
            } catch (error) {
                return next(error);
            }
        });

    server.use('/auth', router);
}
