// import { api } from "@/lib/axios";
import { apiExpress } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(5, {
        message: "Password must have at least 5 characters"
    })
})

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginResponse = {
    token: string;
    user: User;
}

const login = async (data: LoginSchema) : Promise<LoginResponse> => {
    const response = await apiExpress.post<LoginResponse>("/api/auth/login", data);
    return response.data;
}


export const useLogin = () => useMutation({
    mutationFn: login
});


