"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const s3_service_1 = require("./services/s3-service");
const seed_1 = require("./prisma/seed");
dotenv_1.default.config();
async function startServer() {
    await (0, s3_service_1.createBucket)();
    await (0, seed_1.seedDB)();
    const port = process.env.PORT || 3000;
    app_1.default.listen(port, () => {
        console.log(`Servidor em execução na porta ${port}!`);
    });
}
startServer();
