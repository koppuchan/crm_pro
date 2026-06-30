import dotenv from "dotenv";
import knex from "knex";
import config from "../knexfile";

dotenv.config();

async function runSeeds() {
  const db = knex(config);
  await db.seed.run();
  await db.destroy();
}

runSeeds().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
