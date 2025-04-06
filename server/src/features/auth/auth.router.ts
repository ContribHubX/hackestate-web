import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import AuthService from "./auth.service";
import {
  loginAdminSchema,
  loginSchema,
  registerAdminSchema,
  registerSchema,
} from "./auth.contracts";
import { validateData } from "@/common/middleware/validate-request";


export const authRouter: Router = Router();

authRouter.post(
  "/auth/login",
  validateData(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get(AuthService);
      const { user, token } = await authService.Login(req.body);

      Reflect.deleteProperty(user, "password");
      res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/auth/admin/login",
  validateData(loginAdminSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get(AuthService);
      const { admin, token } = await authService.LoginAdmin(req.body);

      Reflect.deleteProperty(admin, "password");
      res.status(200).json({
        admin,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/auth/admin/register",
  validateData(registerAdminSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authService = Container.get(AuthService);
      const admin = await authService.RegisterAdmin(req.body);

      Reflect.deleteProperty(admin, "password");
      res.status(200).json({
        admin
      });
    } catch (error) {
      next(error);
    }
  }
);



