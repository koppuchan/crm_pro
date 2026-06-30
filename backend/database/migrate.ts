import dotenv from "dotenv";
import mysql from "mysql2/promise";
import knex from "knex";
import config from "../knexfile";

dotenv.config();

async function migrate() {
  const dbName = process.env.DB_NAME || "crm";

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  });

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await conn.end();

  const db = knex(config);
  const [batch, log] = await db.migrate.latest();

  if (log.length === 0) {
    console.log("Database is already up to date");
  } else {
    console.log(`Batch ${batch} completed:`);
    log.forEach((name: string) => console.log(`  ✓ ${name}`));
  }

  await db.destroy();
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
