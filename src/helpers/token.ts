import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";

const secret = String(process.env.JWT_SECRET);
const expiresIn = String(process.env.JWT_EXPIRES_IN);

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, secret, { expiresIn });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, secret);
};

export const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const decoded: any = await jwt.verify(refreshToken, secret);
    if (!decoded) return null;
    return generateAccessToken(String(decoded.userId));
  } catch (err) {
    console.error("Erro ao verificar o token de atualização:", err);
    return null;
  }
};

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(
      token,
      String(process.env.JWT_SECRET),
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);

        const user = await UserModel.findById(String(decoded.userId)).exec();
        if (!user) return res.sendStatus(401);

        req.user = user as any;
        next();
      }
    );
  } catch (error) {
    console.error("Erro na autenticação do usuário:", error);
    res.sendStatus(500);
  }
};
