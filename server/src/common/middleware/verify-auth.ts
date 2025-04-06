import { AppError } from "../app-error";
import { Request, Response, NextFunction } from "express";;
import { parseLocalToken, verifyLocalToken } from "../utils/jwt-util";
import { User } from "@/database/schema";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

type DecodedToken = User & {
  iat?: number;
  exp?: number;
};

// DONE refactor into token based auth
export async function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let token: string | undefined = undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw AppError.unauthorized("Access token is missing"); 
  }

  try {
    let { ok, decoded } = verifyLocalToken(parseLocalToken(token));
    const { iat, exp, password, ...userData } = decoded as DecodedToken;

    if (!ok || !decoded) {
      throw AppError.unauthorized("Invalid pre");
    }

    req.currentUser = userData as User;

    next();
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      next(AppError.unauthorized("Token is expired"));
    } else if (error instanceof JsonWebTokenError) {
      next(AppError.unauthorized('Invalid token'));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(AppError.internalServer('An internal error occurred during authentication.'));
    }
  }
}

