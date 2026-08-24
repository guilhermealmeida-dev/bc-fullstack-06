import express, { json } from 'express';
import cors from 'cors';
import { authController } from './controllers/auth-controller';
import { errorHandler } from './middlewares/error-handler';
import { userController } from './controllers/user-controller';
import path from "path";
import { activityController } from './controllers/activity-controller';
import { logError } from './middlewares/log-error';
import { setupSwagger } from './setup-swagger';

const app = express();

// Config
app.use(json());
app.use(cors());

setupSwagger(app);

// Controllers
app.use("/no-response",()=>{

})
authController(app);
userController(app);
activityController(app);

// Resources
app.use("/public", express.static(path.join(__dirname, "../public")));

// Middleware
app.use(logError);
app.use(errorHandler);

export default app;