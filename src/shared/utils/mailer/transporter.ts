import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.PORT),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
