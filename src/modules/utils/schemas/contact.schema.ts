import { z } from "zod";

export interface ContactBody {
  email: string;
  name: string;
  message: string;
}

export const contactBodySchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  message: z.string(),
});
