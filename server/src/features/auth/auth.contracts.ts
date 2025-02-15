import { passwordSchema } from "@/common/utils/common-validation";
import { User } from "@/database/schema/user";
import {z} from "zod";


export const loginSchema = z.object(
    {
        email: z.string().email(),
        password: passwordSchema
    }
)

export const registerSchema = z.object(
    {
        email: z.string().email(),
        name: z.string().min(5, {
            message: "Name must have at least 5 characters"
        }),
        password: passwordSchema
    }
)

export const forgotPasswordSchema = z.object({
    email: z.string().email()
});

export const changePasswordSchema = z.object({
    passwordResetToken: z.string(),
    newPassword: passwordSchema
});


export type LoginSchema = z.infer<typeof loginSchema>
export type LoginResponse = {
    token: string;
    user: User;
}

export type RegisterSchema = z.infer<typeof registerSchema>

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordResponse = {
    
}

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type ChangePasswordResponse = {
    
}