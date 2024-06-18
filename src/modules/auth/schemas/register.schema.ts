import { z } from "zod";

export interface RegisterBody {
  email: string;
  username: string;
  password: string;
}

export const registerBodySchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
});
