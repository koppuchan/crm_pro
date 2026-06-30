import dotenv from "dotenv";
import type { Knex } from "knex";

dotenv.config();

const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "crm",
  },
  pool: { min: 0, max: 10 },
  migrations: {
    directory: "./database/migrations",
    extension: "ts",
    loadExtensions: [".ts"],
  },
  seeds: {
    directory: "./database/seeds",
    extension: "ts",
    loadExtensions: [".ts"],
  },
};

export default config;
