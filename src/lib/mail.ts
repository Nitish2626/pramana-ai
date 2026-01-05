import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // host: process.env.NODEMAILER_HOST as string,
  // port: process.env.NODEMAILER_PORT,
  // secure: false,
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
