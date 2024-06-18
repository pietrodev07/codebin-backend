import { z } from "zod";

export interface LoginBody {
  username: string;
  password: string;
}

export const loginBodySchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});
