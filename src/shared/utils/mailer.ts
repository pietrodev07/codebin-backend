import { createTransport } from "nodemailer";
import Mailgen from "mailgen";

import { BASE_FRONTEND_URL } from "@/config/*";
import { EmailOptions } from "@/types/index";

const transporter = createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.PORT),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const mailGenerator = new Mailgen({
  theme: "salted",
  product: {
    name: "Renoth",
    link: BASE_FRONTEND_URL,
  },
});

export const sendEmail = async (options: EmailOptions) => {
  try {
    await transporter.sendMail({
      from: "pietro.dev.07@gmail.com",
      to: options.to,
      subject: options.subject,
      html: options.text,
    });
  } catch (err) {
    console.log(err);
    throw Error();
  }
};

export const verifyAccountEmail = async (
  username: string,
  email: string,
  token: string
) => {
  const emailBody = {
    body: {
      name: username,
      intro: "Welcome to Renoth! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Renoth, please click here:",
        button: {
          color: "#22BC66",
          text: "Confirm your account",
          link: `${BASE_FRONTEND_URL}/auth/verify?token=${token}&email=${email}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  await sendEmail({
    subject: "Verify Account",
    to: email,
    text: mailGenerator.generate(emailBody),
  });
};

export const resetPasswordEmail = async (
  username: string,
  email: string,
  token: string
) => {
  const emailBody = {
    body: {
      name: username,
      intro:
        "You have received this email because a password reset request for your accont was received!",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#ee3266",
          text: "Reset your password",
          link: `${BASE_FRONTEND_URL}/auth/reset?token=${token}&email=${email}`,
        },
      },
      outro:
        "If you did not request a password reset, no further action is required on your part",
    },
  };

  await sendEmail({
    subject: "Reset Password",
    to: email,
    text: mailGenerator.generate(emailBody),
  });
};

export const contactEmail = async (
  name: string,
  email: string,
  message: string
) => {
  const emailBody = {
    body: {
      name: `${name} - ${email}`,
      intro: message,
    },
  };

  await sendEmail({
    subject: "Email from codebin",
    to: "pietro.dev.07@gmail.com",
    text: mailGenerator.generate(emailBody),
  });
};
