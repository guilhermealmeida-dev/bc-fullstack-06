import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

const server = express();

server.use(json());
server.use(cors());
dotenv.config();

const port=process.env.PORT;

server.listen(port,()=>{
    console.log(`Servidor em execução na porta ${port}!`);
});