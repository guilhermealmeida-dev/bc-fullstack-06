"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
server.get("/get", (req, res) => {
    res.status(200).send("End point funcionando");
});
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
