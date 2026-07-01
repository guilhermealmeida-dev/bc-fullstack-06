import { describe, expect, test, jest } from '@jest/globals';
import request from "supertest"
import express, { json } from 'express';
import { authController } from '../../src/controllers/auth-controller';
import { AuthJwtPayload } from '../../src/types/payload/userPayload';
import { jwtTokenGenerate } from '../../src/utils/jwt-token-generate';
import { AuthLogin } from '../../src/types/auth/auth-login';

//Data
const user = {
    email: "gui@example.com",
    id: "user-001",
    cpf: "12345678900",
    name: "Guilherme Souza",
    avatar: "https://example.com/avatar/guilherme.png",
    xp: 1250,
    level: 5,
    archievements: [
        {
            id: "user-achievement-001",
            archievementId: "achievement-001",
            userId: "user-001"
        },
        {
            id: "user-achievement-002",
            archievementId: "achievement-002",
            userId: "user-001"
        }
    ]
};

const token = "fake-jwt-token";

//Mocks
jest.mock("../../src/services/auth-service.ts", () => ({
    login: (data: AuthLogin) => {
        return data.email === "gui@example.com" ? user : null
    }
}));

jest.mock("../../src/utils/jwt-token-generate", () => ({
    jwtTokenGenerate: (payload: AuthJwtPayload) => {
        return token;
    }
}));

//Dependences
const app = express();
app.use(json());
authController(app);

//Tests
describe("Auth Controller", () => {
    //Teste endponit de login
    describe("POST /auth/sign-in", () => {
        //Sucesso login: 200
        test("Retornar 200 login realizado com sucesso", async () => {
            const response = await request(app)
                .post("/auth/sign-in")
                .send({
                    email: "gui@example.com",
                    password: "123456"
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual({ token: token, ...user });
            expect(response.status).toBe(200);
        })
    });

});

