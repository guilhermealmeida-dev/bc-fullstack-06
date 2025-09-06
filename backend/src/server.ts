import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authController } from './controllers/auth-controller';
import { errorHandler } from './middlewares/error-handler';
import userController from './controllers/user-controller';
import { createBucket } from './services/s3-service';
import path from "path";
import swagger from "swagger-ui-express";
import docs from "./docs/swagger.json";
import { activityController } from './controllers/activity-controller';
import { logError } from './middlewares/log-error';

const server = express();

// Config
server.use(json());
server.use(cors());
dotenv.config();
server.use("/api-docs/", swagger.serve, swagger.setup(docs));

// Controllers
authController(server);
userController(server);
activityController(server);

// Middleware
server.use(logError);
server.use(errorHandler);

// Resources
server.use("/public", express.static(path.join(__dirname, "../public")));
createBucket();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}!`);
});
