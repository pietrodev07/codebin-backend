import { EmailOptions } from "@/types/index";
import { transporter } from "./transporter";

export const sendEmail = async (options: EmailOptions) => {
  await transporter.sendMail({
    from: process.env.MAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
  });
};
