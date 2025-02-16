import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(5, {
        message: "Password must have at least 5 characters"
    })
})

export type LoginSchema = z.infer<typeof loginSchema>;  

const login = async (data: LoginSchema) => {
    const response = await api.post("/api/auth/login", data);
    return response.data; 
}

export const useLogin = () => useMutation({
    mutationFn: login
});


