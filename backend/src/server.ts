import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authController } from './controllers/auth-controller';
import { errorHandler } from './middlewares/error-handler';
import userController from './controllers/user-controller';
import { createBucket } from './services/s3-service';
import path from "path";
import { activityController } from './controllers/activity-controller';
import { logError } from './middlewares/log-error';
import { setupSwagger } from './setup-swagger';

const server = express();

// Config
server.use(json());
server.use(cors());
dotenv.config();
setupSwagger(server);

// Controllers
authController(server);
userController(server);
activityController(server);

// Middleware
server.use(logError);
server.use(errorHandler);

// Resources
server.use("/public", express.static(path.join(__dirname, "../public")));
// createBucket();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}!`);
});
