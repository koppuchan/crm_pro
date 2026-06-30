import type { Knex } from "knex";
import { hashPassword } from "../../src/utils/password";
import { Role } from "../../src/constants/roles";

export async function seed(knex: Knex): Promise<void> {
  const email = process.env.ADMIN_EMAIL ?? "admin@crm";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  const exists = await knex("users").where({ email }).first("id");

  if (exists) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await hashPassword(password);

  await knex("users").insert({
    email,
    password_hash: passwordHash,
    role: Role.Admin,
    display_name: "Admin",
  });

  console.log(`Admin created: ${email}`);
}
