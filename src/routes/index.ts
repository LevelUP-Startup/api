import { Router, Request, Response } from "express";
import authRoutes from "./auth";

const router = Router();

router.get("/ping", (_: Request, res: Response) => {
  res.status(200).send("Pong");
});

router.use("/auth", authRoutes);

export default router;
