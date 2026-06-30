"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearSession, getUser } from "@/lib/auth";
import { UserAvatar } from "./UserAvatar";

export function ProfileMenu() {
  const router = useRouter();
  const user = getUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function handleSignOut() {
    setOpen(false);
    clearSession();
    router.push("/login");
    router.refresh();
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full ring-2 ring-gray-700 transition hover:ring-purple-500 focus:outline-none focus:ring-purple-500"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="プロフィールメニュー"
      >
        <UserAvatar user={user} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg border border-gray-700 bg-gray-800 py-1 shadow-lg"
        >
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700"
          >
            プロフィール編集
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="block w-full px-4 py-2.5 text-left text-sm text-gray-200 hover:bg-gray-700"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}
