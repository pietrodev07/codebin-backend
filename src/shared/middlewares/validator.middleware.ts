import { ZodType } from "zod";
import { zValidator } from "@hono/zod-validator";

export const bodyValidator = (schema: ZodType) => {
  return zValidator("json", schema);
};
