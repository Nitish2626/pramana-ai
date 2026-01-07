import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { transporter } from "./mail";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    // sendResetPassword: async ({ user, url }) => {
    //   await transporter.sendMail({
    //     from: `It's me ${process.env.NODEMAILER_EMAIL}`,
    //     to: user.email,
    //     subject: "Reset your password",
    //     html: `
    //         <p>Hello ${user.name ?? "User"},</p>
    //         <p>You requested to reset your password.</p>
    //         <p>
    //           <a href="${url}" target="_blank">
    //             Click here to reset your password
    //           </a>
    //         </p>
    //         <p>This link will expire soon.</p>
    //         <br />
    //         <p>If you didn’t request this, you can safely ignore this email.</p>
    //       `,
    //   });
    // },
  },
});
