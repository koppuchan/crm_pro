"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLogo } from "@/components/auth/AuthLogo";
import {
  buttonClassName,
  inputClassName,
  labelClassName,
  linkClassName,
} from "@/components/auth/styles";
import { login, saveSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const session = await login(email, password);
      saveSession(session);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました。");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthLogo />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          ログイン
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="email" className={labelClassName}>
              メールアドレス
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                autoComplete="email"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className={labelClassName}>
                パスワード
              </label>
              <div className="text-sm">
                <span className={linkClassName + " cursor-not-allowed opacity-50"}>
                  パスワードをお忘れの方は
                </span>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <button type="submit" disabled={loading} className={buttonClassName}>
              {loading ? "ログインしています..." : "ログインする"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          会員登録がお済みでない方は{" "}
          <Link href="/register" className={linkClassName}>
            新規登録
          </Link>
        </p>
      </div>
    </>
  );
}
