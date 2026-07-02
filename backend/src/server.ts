import dotenv from "dotenv";
import app from "./app";

import { createBucket } from "./services/s3-service";
import { seedDB } from "./prisma/seed";

dotenv.config();

async function startServer() {

    await createBucket();
    await seedDB();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Servidor em execução na porta ${port}!`);
    });
}

startServer();