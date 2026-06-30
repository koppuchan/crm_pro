import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { Role } from "../constants/roles";
import { User, UserWithPassword } from "../types/user";
import { RegisterInput } from "../validators/auth.validator";

const PUBLIC_COLUMNS =
  "id, email, role, first_name, last_name, display_name, avatar, created_at, updated_at";

interface UserRow extends RowDataPacket, User {}

interface UserAuthRow extends RowDataPacket, UserWithPassword {}

export const userRepository = {
  async existsByEmail(email: string): Promise<boolean> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT 1 FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    return rows.length > 0;
  },

  async findByEmail(email: string): Promise<UserWithPassword | null> {
    const [rows] = await pool.query<UserAuthRow[]>(
      `SELECT ${PUBLIC_COLUMNS}, password_hash FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0] ?? null;
  },

  async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query<UserRow[]>(
      `SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] ?? null;
  },

  async createUser(input: RegisterInput, passwordHash: string): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (email, password_hash, role, first_name, last_name, display_name, avatar)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        input.email,
        passwordHash,
        Role.User,
        input.first_name,
        input.last_name,
        input.display_name,
        input.avatar ?? null,
      ]
    );
    return result.insertId;
  },
};
