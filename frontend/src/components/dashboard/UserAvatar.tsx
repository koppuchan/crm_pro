"use client";

import { useState } from "react";
import { User } from "@/lib/auth";

function DefaultAvatarIcon() {
  return (
    <svg className="h-[55%] w-[55%]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
    </svg>
  );
}

interface UserAvatarProps {
  user: User | null;
  className?: string;
}

export function UserAvatar({ user, className = "" }: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const displayName = user?.display_name ?? user?.email ?? "ユーザー";
  const showImage = Boolean(user?.avatar) && !imgError;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user!.avatar!}
        alt={displayName}
        className={`h-9 w-9 rounded-full object-cover ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-gray-600 text-white ${className}`}
      aria-hidden="true"
    >
      <DefaultAvatarIcon />
    </span>
  );
}
