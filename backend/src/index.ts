import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db";
import healthRouter from "./routes/health";
import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

async function checkDatabase() {
  try {
    await pool.query("SELECT 1 FROM users LIMIT 1");
    console.log("Database ready");
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };

    if (err.code === "ER_NO_SUCH_TABLE") {
      console.error(
        "Table 'users' does not exist. Run: npm run migrate"
      );
      return;
    }

    if (err.code === "ER_BAD_DB_ERROR") {
      console.error(
        "Database 'crm' does not exist. Run: npm run migrate"
      );
      return;
    }

    console.error("Database check failed:", err.message ?? error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  void checkDatabase();
});
