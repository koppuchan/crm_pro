import { userRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import { User } from "../types/user";
import { LoginInput, RegisterBody } from "../validators/auth.validator";

interface AuthResult {
  token: string;
  user: User;
}

export const authService = {
  async register(body: RegisterBody): Promise<AuthResult> {
    const { password_confirm: _, ...input } = body;

    if (await userRepository.existsByEmail(input.email)) {
      throw new AppError(409, "このメールアドレスは既に登録されています");
    }

    const passwordHash = await hashPassword(input.password);
    const userId = await userRepository.createUser(input, passwordHash);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(500, "ユーザーの作成に失敗しました");
    }

    return { token: signToken(user.id, user.role), user };
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await userRepository.findByEmail(input.email);

    if (!user || !(await verifyPassword(input.password, user.password_hash))) {
      throw new AppError(401, "メールアドレスまたはパスワードが正しくありません");
    }

    const { password_hash: _, ...publicUser } = user;
    return { token: signToken(publicUser.id, publicUser.role), user: publicUser };
  },

  async getProfile(userId: number): Promise<User> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError(404, "ユーザーが見つかりません");
    }

    return user;
  },
};
