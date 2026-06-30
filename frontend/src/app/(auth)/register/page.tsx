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
import { register, saveSession } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const passwordConfirm = form.get("password_confirm") as string;

    if (password !== passwordConfirm) {
      setError("パスワードが一致しません。");
      setLoading(false);
      return;
    }

    try {
      const session = await register({
        email: form.get("email") as string,
        password,
        password_confirm: passwordConfirm,
        first_name: form.get("first_name") as string,
        last_name: form.get("last_name") as string,
        display_name: form.get("display_name") as string,
      });
      saveSession(session);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました。");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthLogo />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          新規登録
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="last_name" className={labelClassName}>
                姓
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  autoComplete="family-name"
                  className={inputClassName}
                />
              </div>
            </div>
            <div>
              <label htmlFor="first_name" className={labelClassName}>
                名
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  autoComplete="given-name"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="display_name" className={labelClassName}>
              表示名
            </label>
            <div className="mt-2">
              <input
                id="display_name"
                name="display_name"
                type="text"
                required
                autoComplete="nickname"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              メールアドレス
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={labelClassName}>
              パスワード
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password_confirm" className={labelClassName}>
              パスワード（再入力）
            </label>
            <div className="mt-2">
              <input
                id="password_confirm"
                name="password_confirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <button type="submit" disabled={loading} className={buttonClassName}>
              {loading ? "登録しています..." : "登録する"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          会員登録済みの方は{" "}
          <Link href="/login" className={linkClassName}>
            ログイン
          </Link>
        </p>
      </div>
    </>
  );
}
