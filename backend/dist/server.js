"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_controller_1 = require("./controllers/auth-controller");
const error_handler_1 = require("./middlewares/error-handler");
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
const path_1 = __importDefault(require("path"));
const activity_controller_1 = require("./controllers/activity-controller");
const log_error_1 = require("./middlewares/log-error");
const setup_swagger_1 = require("./setup-swagger");
const server = (0, express_1.default)();
// Config
server.use((0, express_1.json)());
server.use((0, cors_1.default)());
dotenv_1.default.config();
(0, setup_swagger_1.setupSwagger)(server);
// Controllers
(0, auth_controller_1.authController)(server);
(0, user_controller_1.default)(server);
(0, activity_controller_1.activityController)(server);
// Middleware
server.use(log_error_1.logError);
server.use(error_handler_1.errorHandler);
// Resources
server.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
// createBucket();
// seedDB();
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}!`);
});
