import { describe, expect, test, jest } from '@jest/globals';
import request from "supertest"
import express, { json } from 'express';
import { authController } from '../../controllers/auth-controller';
import { login } from "../../services/auth-service";
import { errorHandler } from '../../middlewares/error-handler';

const app = express();

app.use(json());
authController(app);
app.use(errorHandler);

//MOKS
const mockedUser = {
    id: "user-001",
    email: "gui@example.com",
    cpf: "123",
    name: "Gui",
    avatar: "",
    xp: 100,
    level: 2,
    archievements: []
};
type User = typeof mockedUser;

const loginMock = jest.fn<() => Promise<User>>();

//Auth Sevice
jest.mock("../../src/services/auth-service");

//Jwt
jest.mock("../../src/utils/jwt-token-generate", () => ({
    jwtTokenGenerate: (payload: { id: string, email: string }) => {
        return "fake-token";
    }
}));


//Tests----------------------------------------------
describe("Auth Controller", () => {
    //Teste endponit de login
    describe("POST /auth/sign-in", () => {
        //Sucesso login (200):
        test("should return 200", async () => {
            const mockedLogin = jest.mocked(login);
            mockedLogin.mockResolvedValue(mockedUser);

            const response = await request(app)
                .post("/auth/sign-in")
                .send({
                    email: "gui@example.com",
                    password: "123456"
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                token: "fake-token",
                ...mockedUser
            });
        });

        //Erro corpo da requisição inválido 400
        test("Shoud return 400 when request body is inválid", async () => {
            const response = await request(app).post("/auth/sign-in").send({
                email: "gui@example.com",
            });

            expect(response.status).toBe(400);
        });

        //Erro não autorizado 401
        test("Shoud return 401 when invalid password", async () => {
            const mockedLogin = jest.mocked(login);
            mockedLogin.mockRejectedValue({
                status: 401,
                message: "Senha incorreta."
            });   

            const response = await request(app).post("/auth/sign-in").send({
                email: "edu@example.com",
                password: "123456"
            });

             expect(response.body).toEqual({error:"Senha incorreta."});
            expect(response.status).toBe(401);
        });

         //Erro conta desativada 404
        test("Shoud return 403 when desactive acout", async () => {
            const mockedLogin = jest.mocked(login);
            mockedLogin.mockRejectedValue({
                status: 403,
                message: "Esta conta foi desativada e não pode ser utilizada."
            });   

            const response = await request(app).post("/auth/sign-in").send({
                email: "edu@example.com",
                password: "123456"
            });

             expect(response.body).toEqual({error:"Esta conta foi desativada e não pode ser utilizada."});
            expect(response.status).toBe(403);
        });

        //Erro usuario não encontrado 404
        test("Shoud return 404 when userNotfound", async () => {
            const mockedLogin = jest.mocked(login);
            mockedLogin.mockRejectedValue({
                status: 404,
                message: "Usuário não encontrado."
            });   

            const response = await request(app).post("/auth/sign-in").send({
                email: "edu@example.com",
                password: "123456"
            });

            expect(response.status).toBe(404);
        });

        //Erro interno no 500
        test("Shoud return 500 when internalServerError", async () => {
            const mockedLogin = jest.mocked(login);
            mockedLogin.mockRejectedValue({
                status: 500,
                message: "Erro interno no servidor."
            });   

            const response = await request(app).post("/auth/sign-in").send({
                email: "edu@example.com",
                password: "123456"
            });

            expect(response.body).toEqual({error:"Erro interno no servidor."});
            expect(response.status).toBe(500);
        });

    });

});

