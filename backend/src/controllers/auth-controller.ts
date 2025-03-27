import { Express, Router, NextFunction } from 'express';
import { createUser, login } from '../services/auth-service';
import jwt from 'jsonwebtoken';
import authValidation from '../validations/auth-validation';
import requestBodyValidator from '../middleware/request-body-validator';
import createValidation from '../validations/create-validation';

const jwtSecret = process.env.JWT_SECRET!;

function authController(server: Express) {
    const router = Router();

    router.post('/register',requestBodyValidator(createValidation), async (request, response, next: NextFunction) => {
        try {
            const userData = request.body;     
            await createUser(userData);
            response.status(201).json({message:"Usuário criado com sucesso!"});
        } catch (error: any) {
            next(error);
        }
    });

    router.post('/sign-in',requestBodyValidator(authValidation), async (request, response, next: NextFunction) => {
        try {
            const { email, password } = request.body;
            const user = await login({ email, password });
            const token = jwt.sign(user, jwtSecret, { expiresIn: '1d' });
            response.status(200).json({ token: token, user});
        } catch (error) {
            next(error);
        }
    });

    server.use('/auth', router);
}
export default authController;
