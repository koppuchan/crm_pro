import { Role } from "../constants/roles";

export interface User {
  id: number;
  email: string;
  role: Role;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithPassword extends User {
  password_hash: string;
}

export interface AuthTokenPayload {
  sub: number;
  role: Role;
}
