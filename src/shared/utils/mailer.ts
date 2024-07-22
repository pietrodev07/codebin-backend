import Mailgen from "mailgen";
import { createTransport } from "nodemailer";

import { EmailOptions } from "@/types/*";
import { BASE_FRONTEND_URL } from "@/config/*";

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  service: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
      from: process.env.EMAIL_USER,
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
    to: process.env.EMAIL_USER,
    text: mailGenerator.generate(emailBody),
  });
};
