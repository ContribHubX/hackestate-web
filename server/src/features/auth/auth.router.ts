import { Router, Request, Response, NextFunction } from "express"
import Container from "typedi";
import AuthService from "./auth.service";
import { changePasswordSchema, forgotPasswordSchema, loginSchema, registerSchema } from "./auth.contracts";
import { validateData } from "@/common/middleware/validate-request";
import { verifyAuth } from "@/common/middleware/verify-auth";
import { uploadProfile } from "@/common/cloudinary";

export const authRouter: Router = Router();

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
                // maxAge: 3600000,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expiry date set to 7 days from now
                secure: true,
                sameSite: "none"
            });

            Reflect.deleteProperty(user, "password");
            res.status(200).json(user);
        } catch(error) {
            next(error);
        }

})

// authRouter.post(
//     "/auth/register",
//     validateData(registerSchema),
//     async(req: Request, res: Response, next: NextFunction) => {

//         console.log("register endpoint");

//         try {
//             const authService = Container.get(AuthService);
//             await authService.Register(req.body);

//             res.status(201).json({ message: "Register successfull" });
//         } catch(error) {
//             next(error);
//         }

// })


// authRouter.post(
//     "/auth/forgot-password",
//     validateData(forgotPasswordSchema),
//     async(req: Request, res: Response, next: NextFunction) => {

//         try {
//             const authService = Container.get(AuthService);
//             await authService.ForgotPassword(req.body);
//             res.status(200).json();
//         } catch(error) {
//             next(error);
//         }

// })

// authRouter.post(
//     "/auth/change-password",
//     validateData(changePasswordSchema),
//     async(req: Request, res: Response, next: NextFunction) => {

//         try {
//             const authService = Container.get(AuthService);
//             const response = await authService.ChangePassword(req.body);
//             res.status(200).json(response.message);
//         } catch(error) {
//             next(error);
//         }

// })



// EXTERNAL AUTHENTICATION

// authRouter.get(
//     "/auth/url/:provider",
//     async(req: Request, res: Response, next: NextFunction) => {

//         const provider = req.params.provider;

//         const authService = Container.get(AuthServiceExternal);
//         const redirectUrl = authService.generateAuthUrl(provider as SocialAuthProvider);
//         res.status(200).json({ url: redirectUrl });
// })


// authRouter.get(
//     "/auth/:provider/callback",
//     async(req: Request, res: Response, next: NextFunction) => {

//         const code = req.query.code;
//         const provider = req.params.provider;
//         const authService = Container.get(AuthServiceExternal);
//         const user = await authService.handleOAuthCallback(provider.toUpperCase() as SocialAuthProvider, code as string);
//         res.status(200).json(user);
// })


// authRouter.get(
//     "/auth/me", verifyAuth,
//     async(_req: Request, res: Response, next: NextFunction) => {
//     try {
//         res.status(200).json(_req.currentUser);
//     } catch(error) {
//         next(error);
//     }
// })



// authRouter.post(
//     "/auth/upload",
//     uploadProfile.single("attachment"),
//     async (req: Request, res: Response) => {
//         const url = req.file!.path;

//         console.log("cloudinary link: " + url);
//         res.status(200).json({ url });
//     }
// )




