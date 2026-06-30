import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .email({ message: "有効なメールアドレスを入力してください" })
      .max(255),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .max(128),
    password_confirm: z
      .string()
      .min(1, "パスワード（再入力）を入力してください"),
    first_name: z.string().min(1, "名を入力してください").max(100),
    last_name: z.string().min(1, "姓を入力してください").max(100),
    display_name: z.string().min(1, "表示名を入力してください").max(150),
    avatar: z
      .url({ message: "有効なURLを入力してください" })
      .max(500)
      .optional()
      .nullable(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "パスワードが一致しません",
    path: ["password_confirm"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "メールアドレスを入力してください").max(255),
  password: z.string().min(1, "パスワードを入力してください").max(128),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export type RegisterInput = Omit<RegisterBody, "password_confirm">;
export type LoginInput = z.infer<typeof loginSchema>;
