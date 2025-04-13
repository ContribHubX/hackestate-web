import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const registerSchema = z.object({
    email: z.string(),
    name: z.string().min(5, {
        message: "Username must have at least 4 characters"
    }).max(15, {
        message: "Username should not exceed 15 characters"
    }),
    password: z.string().min(5, {
        message: "Password must have at least 5 characters"
    })
})

export type RegisterSchema = z.infer<typeof registerSchema>;

const register = async (data: RegisterSchema) => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
}

export const useRegister = () => useMutation({
    mutationFn: register
});
