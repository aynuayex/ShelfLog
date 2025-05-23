import { z } from "zod";

export const bookSchema = z.object({
    toppings: z.array(
        z.object({
          name: z.string(),
          checked: z.boolean(),
        })
      ),

    // mozzarella: z.boolean(),
    // tomato: z.boolean(),
    // bell_peppers: z.boolean(),
    // onions: z.boolean(),
    // olives: z.boolean(),
})

export type BookSchema = z.infer<typeof bookSchema>;