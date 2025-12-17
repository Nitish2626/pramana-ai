import { z } from "zod";

export const schema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required!" })
    .max(20, "Username must be at most 20 characters!")
    .regex(/^[A-Za-z][A-Za-z0-9]*$/, {
      message:
        "Username must start with a letter and contain only letters and numbers!",
    }),
  email: z
    .email({ message: "Invalid email address!" })
    .min(1, "Email is required!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters!")
    .max(16, "Password must be at most 16 characters!")
    .regex(/[A-Z]/, "Password must contain one uppercase letter!")
    .regex(/[0-9]/, "Password must contain one number!")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character!"),
});


