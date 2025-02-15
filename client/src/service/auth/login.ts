import { z } from "zod";

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(5, {
        message: "Password must have at least 5 characters"
    })
})

export type LoginSchema = z.infer<typeof loginSchema>;  




