import SwaggerParser from "@apidevtools/swagger-parser";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

export async function setupSwagger(app: Express) {
  const swaggerDocument = await SwaggerParser.dereference(
    path.join(__dirname, "./docs/swagger.json")
  );

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
