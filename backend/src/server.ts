import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authController from './controllers/auth-controller';
import { errorHandler } from './middleware/errorMiddleware';
import userController from './controllers/user-controller';
import { createBucket } from './services/s3-service';
import path from "path";

const server = express();

server.use(json());
server.use(cors());
dotenv.config();

authController(server);
userController(server);

server.use(errorHandler);


createBucket();
server.use("/public", express.static(path.join(__dirname, "../public")));

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}!`);
});
