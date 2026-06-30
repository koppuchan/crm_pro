import dotenv from "dotenv";
import knex from "knex";
import config from "../knexfile";

dotenv.config();

async function rollback() {
  const db = knex(config);
  const [batch, log] = await db.migrate.rollback();

  if (log.length === 0) {
    console.log("Nothing to rollback");
  } else {
    console.log(`Batch ${batch} rolled back:`);
    log.forEach((name: string) => console.log(`  ✓ ${name}`));
  }

  await db.destroy();
}

rollback().catch((error) => {
  console.error("Rollback failed:", error);
  process.exit(1);
});
