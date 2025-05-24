import { z } from "zod";

export const bookSchema = z.object({
    title: z.string().min(2,{ message: "title must be at least 2 characters."}),
    author: z.string().min(5, { message: "Password must be at least 5 characters."}),
    category: z.string().min(5, { message: "Password must be at least 5 characters."}),
    note: z.string().optional(),
})

export type BookSchema = z.infer<typeof bookSchema>;