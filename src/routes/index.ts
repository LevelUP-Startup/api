import { Router, Request, Response } from "express";

const router = Router();

export default router.get("/ping", (_: Request, res: Response) => {
  res.status(200).send("Pong");
});
