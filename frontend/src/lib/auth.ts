import { parseApiError } from "./errors";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "token";
const USER_KEY = "user";

export interface User {
  id: number;
  email: string;
  role: "admin" | "user";
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  avatar: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterInput {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar?: string | null;
}

async function authFetch<T>(
  path: string,
  options: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) {
    throw new Error(await parseApiError(res));
  }

  return res.json();
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    return await authFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "APIに接続できません。バックエンドがポート5000で起動しているか確認してください。"
      );
    }
    throw error;
  }
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  try {
    return await authFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "APIに接続できません。バックエンドがポート5000で起動しているか確認してください。"
      );
    }
    throw error;
  }
}

export function saveSession({ token, user }: AuthResponse): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = "token=; path=/; max-age=0";
}
