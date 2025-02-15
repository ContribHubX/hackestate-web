import { z } from "zod";

export const registerSchema = z.object({
    email: z.string(),
    username: z.string().min(4, {
        message: "Username must have at least 4 characters"
    }).max(15, {
        message: "Username should not exceed 15 characters"
    }),
    password: z.string().min(5, {
        message: "Password must have at least 5 characters"
    })
})

export type RegisterSchema = z.infer<typeof registerSchema>;  



