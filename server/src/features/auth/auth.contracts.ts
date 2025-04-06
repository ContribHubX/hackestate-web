import { passwordSchema } from "@/common/utils/common-validation";
import { Admin } from "@/database/schema/admin";
import { User } from "@/database/schema/user";
import {z} from "zod";


export const loginSchema = z.object(
    {
        pid: z.string(),
        password: passwordSchema
    }
)

export const adminLoginSchema = z.object(
  {
      email: z.string().email(),
      password: passwordSchema
  }
)

export const loginAdminSchema = z.object({
    email: z.string().email(),
    password: passwordSchema
})

export const registerSchema = z.object(
    {
        pid : z.string()
    }
)

export const registerAdminSchema = z.object({
    email: z.strin
})

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

export type LoginAdminSchema = z.infer<typeof adminLoginSchema>;
export type LoginAdminResponse = {
    token: string;
    admin: Admin;
}

export type RegisterSchema = z.infer<typeof registerSchema>

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordResponse = {

}

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type ChangePasswordResponse = {

}

export type CheckPidResponse = {
    hasPassword : boolean;
    hasPid: boolean;
    pid : string;
}
