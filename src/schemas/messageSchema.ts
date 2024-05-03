import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content Must Be At lest of 10 Character" })
    .max(400, { message: "Content is Too Long to be Sent" }),
});
