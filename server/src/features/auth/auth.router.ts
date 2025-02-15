import { Router, Request, Response, NextFunction } from "express"
import Container from "typedi";
import AuthService from "./auth.service";

import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema } from "./auth.contracts";
import { validateData } from "@/common/middleware/validate-request";
import { verifyLocalToken } from "@/common/utils/jwt-util";
import { verifyAuth } from "@/common/middleware/verify-auth";

export const authRouter: Router = Router();

authRouter.post(
    "/auth/register",  
    validateData(registerSchema),
    async(req: Request, res: Response, next: NextFunction) => {

        try {
            const authService = Container.get(AuthService);
            await authService.Register(req.body);

            res.status(201).json({ message: "Register successfull" });
        } catch(error) {
            next(error);
        }

})

authRouter.post(
    "/auth/login",  
    validateData(loginSchema),
    async(req: Request, res: Response, next: NextFunction) => {

        try {
            const authService = Container.get(AuthService);
            
            const { user, token } = await authService.Login(req.body);

            // attach token to cookie
            res.cookie("token", `LOCAL_${token}`, {
                httpOnly: true,
                maxAge: 3600000, 
            });

            Reflect.deleteProperty(user, "password");
            res.status(200).json(user);
        } catch(error) {
            next(error);
        }

})

authRouter.post(
    "/auth/forgot-password",
    validateData(forgotPasswordSchema),
    async(req: Request, res: Response, next: NextFunction) => {

        try {
            const authService = Container.get(AuthService);
            await authService.ForgotPassword(req.body);
            res.status(200).json();
        } catch(error) {
            next(error);
        }

})

authRouter.post(
    "/auth/change-password",
    validateData(changePasswordSchema),
    async(req: Request, res: Response, next: NextFunction) => {

        try {
            const authService = Container.get(AuthService);
            const response = await authService.ChangePassword(req.body);
            res.status(200).json(response.message);
        } catch(error) {
            next(error);
        }

})

authRouter.get("/me", verifyAuth, async(req: Request, res: Response, next: NextFunction) => {

    try {
        const authService = Container.get(AuthService);
        const response = await authService.GetUser();
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
})



// ln@sample.com
// lorenzo123

