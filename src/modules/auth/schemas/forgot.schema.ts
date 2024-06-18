import { z } from "zod";

export interface ForgotPasswordBody {
  email: string;
}

export const forgotPasswordBodySchema = z.object({
  email: z.string().email(),
});
