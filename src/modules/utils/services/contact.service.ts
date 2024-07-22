import { Context } from "hono";

import { contactEmail } from "@/utils/mailer";
import { ContactBody } from "../schemas/contact.schema";

export const contact = async (c: Context) => {
  const { email, name, message } = await c.req.json<ContactBody>();

  await contactEmail(name, email, message);

  return c.json({
    success: true,
    message: "Email sent successfully!",
  });
};
