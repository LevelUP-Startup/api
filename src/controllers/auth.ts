import { Request, Response } from "express";
import Logger from "../../config/logger";
import { UserModel } from "../models/user";
import { generateAccessToken, generateRefreshToken } from "../helpers/token";

const bcrypt = require("bcrypt");

export const signUp = async (req: Request, res: Response) => {
  try {
    let { email, password, firstName, lastName } = req.body;
    email = email.toLowerCase();
    password = await bcrypt.hash(password, 10);

    const userExists = await UserModel.findOne({ email }).exec();
    if (userExists)
      return res.status(400).json({ message: "E-mail já cadastrado." });

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = generateRefreshToken(String(user._id));

    return res.status(201).json({ user, accessToken, refreshToken });
  } catch (e: any) {
    Logger.error("Erro ao criar usuário:", e);
    return res.status(500).json({ message: "Erro ao criar usuário." });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const user = await UserModel.findOne({ email }).select("+password").exec();

    if (!user)
      return res.status(401).json({ message: "Usuário não encontrado." });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res.status(401).json({ message: "E-mail ou senha incorretos." });

    user.password = undefined as any;

    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = generateRefreshToken(String(user._id));

    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (e: any) {
    Logger.error("Erro ao autenticar usuário:", e);
    return res.status(500).json({ message: "Erro ao autenticar usuário." });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const user = await UserModel.findById(String(userId), {
      firstName: 1,
      lastName: 1,
      email: 1,
    }).exec();

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado." });

    return res.status(200).json(user);
  } catch (e: any) {
    Logger.error("Erro ao buscar usuário:", e);
    return res.status(500).json({ message: "Erro ao buscar usuário." });
  }
};
