import { Request, Response } from "express";
import { body } from "express-validator";
import { verifyRefreshToken } from "../helpers/token";

export const signUpValidation = () => {
  return [
    body("firstName")
      .isString()
      .withMessage("Nome é obrigatório.")
      .isLength({ min: 1 })
      .withMessage("Preencha o nome corretamente."),
    body("lastName")
      .isString()
      .withMessage("Sobrenome é obrigatório.")
      .isLength({ min: 1 })
      .withMessage("Preencha o sobrenome corretamente."),
    body("email")
      .isEmail()
      .withMessage("Email é obrigatório.")
      .isLength({ min: 1 })
      .withMessage("Email incorreto."),
    body("password")
      .isString()
      .withMessage("Senha é obrigatória.")
      .isLength({ min: 8 })
      .withMessage("Senha deve ter no mínimo 8 caracteres."),
  ];
};

export const signInValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email é obrigatório.")
      .isLength({ min: 1 })
      .withMessage("Preencha o e-mail corretamente."),
    body("password")
      .isString()
      .withMessage("Senha é obrigatória.")
      .isLength({ min: 1 })
      .withMessage("Preencha a senha corretamente."),
  ];
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token inválido." });

    const accessToken = await verifyRefreshToken(token);

    if (!accessToken)
      return res.status(401).json({ message: "Token inválido." });

    return res.status(200).json({ accessToken, refreshToken: token });
  } catch (error) {
    console.error("Erro ao atualizar token:", error);
    return res.status(500).json({ message: "Erro ao atualizar token." });
  }
};
