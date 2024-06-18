import { z } from "zod";

export interface ResetPasswordBody {
  password: string;
}

export const resetPasswordBodySchema = z.object({
  password: z.string().min(8),
});
