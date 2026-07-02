import { describe, expect, test, jest } from '@jest/globals';
import request from "supertest"
import { AuthJwtPayload } from '../../src/types/payload/userPayload';
import { AuthLogin } from '../../src/types/auth/auth-login';
import app from "../../src/app";

//Data
const user = {
    email: "gui@example.com",
    password: "123456",
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
jest.mock("../../src/repository/user-repository", () => ({
    findByEmail: (email: string) => {
        return email === "gui@example.com" ? user : null
    }
}));

jest.mock("bcryptjs", () => ({
    compare: jest.fn((password: string, hashPassword: string) => {
        return password === hashPassword;
    })
}));

jest.mock("../../src/utils/jwt-token-generate", () => ({
    jwtTokenGenerate: (payload: AuthJwtPayload) => {
        return token;
    }
}));

//Tests
describe("Auth Controller", () => {
    //Teste endponit de login
    describe("POST /auth/sign-in", () => {
        //Sucesso login (200):
        test("Status - (200): login realizado com sucesso", async () => {
            const response = await request(app)
                .post("/auth/sign-in")
                .send({
                    email: "gui@example.com",
                    password: "123456"
                })
                .expect('Content-Type', /json/)
                .expect(200);

            const { password, ...userOutput } = user;

            expect(response.body).toEqual({ token: token, ...userOutput });
            expect(response.status).toBe(200);
        });

        // Erro corpo de requisição incorreto, dados inválidos, ou em falta (400)
        test("Erro - (400): Corpo da requisição ou dados inválidos", async () => {
            const response = await request(app)
                .post("/auth/sign-in")
                .send({
                    email: "gu@example.com"
                })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toEqual({ error: "Informe os campos obrigatórios corretamente" });
            expect(response.status).toBe(400);
        });

        // Erro usuario não existe(404)
        test("Erro - (404): Usuário não encontrado", async () => {
            const response = await request(app)
                .post("/auth/sign-in")
                .send({
                    email: "carlos@example.com",
                    password: "123456"
                })
                .expect('Content-Type', /json/)
                .expect(404);

            expect(response.body).toEqual({ error: "Usuário não encontrado." });
            expect(response.status).toBe(404);
        });

    });

});

