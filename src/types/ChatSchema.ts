import { z } from "zod";

export const schema = z.object({
  id: z.string().min(1).optional(),
  prompt: z.string().min(1, { message: "Prompt cannot be empty !" }),
  response: z.string().min(1).optional(),
});

export type ChatSchema = z.infer<typeof schema>;
