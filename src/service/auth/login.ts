// import { api } from "@/lib/axios";
import { api } from "@/lib/axios";
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
    admin: User;
}

const login = async (data: LoginSchema) : Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/api/auth/admin/login", data);
    return response.data;
}

// const simulatedLogin = async (data: LoginSchema): Promise<LoginResponse> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 token: "mocked-jwt-token-1234567890",
//                 user: {
//                     id: "user-123",
//                     email: data.email,
//                     name: "Jane Doe",
//                     createdAt: new Date(),
//                     updatedAt: new Date(),
//                 },
//             });
//         }, 300);
//     });
// };

export const useLogin = () => useMutation({
    mutationFn: login
});


