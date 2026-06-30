"use client";

import { useRouter } from "next/navigation";
import { clearSession, getUser } from "@/lib/auth";

export function UserMenu() {
  const router = useRouter();
  const user = getUser();

  function handleSignOut() {
    clearSession();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4">
      {user && (
        <span className="text-sm text-zinc-500">
          {user.display_name ?? user.email}
        </span>
      )}
      <button
        type="button"
        onClick={handleSignOut}
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        ログアウト
      </button>
    </div>
  );
}
