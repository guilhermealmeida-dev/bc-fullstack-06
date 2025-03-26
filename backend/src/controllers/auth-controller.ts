import { Express, Router, NextFunction } from 'express';
import { createUser, login } from '../services/auth-service';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET!;

function authController(server: Express) {
    const router = Router();

    router.post('/register', async (req, res, next: NextFunction) => {
        try {
            const userCriation = req.body;
            const avatar = userCriation.avatar;
            if (!avatar) {
                userCriation.avatar = 'Avatarzinho';
            }
            const user = await createUser(userCriation);
            res.status(201).send(user);
        } catch (error: any) {
            next(error);
        }
    });

    router.post('/sign-in', async (req, res, next: NextFunction) => {
        const { email, password } = req.body;
        try {
            const user = await login({ email, password });
            const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ token: token });
        } catch (error) {
            next(error);
        }
    });

    server.use('/auth', router);
}
export default authController;
