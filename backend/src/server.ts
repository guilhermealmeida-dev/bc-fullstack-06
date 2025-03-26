import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authController from './controllers/auth-controller';
import { errorHandler } from './middleware/errorMiddleware';

const server = express();

server.use(json());
server.use(cors());
dotenv.config();

authController(server);

server.use(errorHandler);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}!`);
});
