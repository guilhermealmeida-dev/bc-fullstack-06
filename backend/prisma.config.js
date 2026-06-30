import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "./dist/prisma/schema.prisma",
  migrations: {
    path: "./dist/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});