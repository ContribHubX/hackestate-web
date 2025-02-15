import { AppError } from "../app-error";
import { Request, Response, NextFunction } from "express";;
import { parseLocalToken, verifyLocalToken } from "../utils/jwt-util";
import { User } from "@/database/schema";

export async function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.token;
    console.log("token: ", token);
    
    if (!token) {
      throw AppError.unauthorized("Access token missing");
    }

    let { ok, decoded } = verifyLocalToken(parseLocalToken(token));
    
    if (!ok || !decoded) {
      throw AppError.unauthorized("Invalid na uy yawa");
    }

    Reflect.deleteProperty(decoded, "password");
    req.currentUser = decoded as User;

    next();
  } catch (error: any) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(AppError.unauthorized("Unauthorized access"));
    }
  }
}

