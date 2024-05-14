import { Router } from "express";
import { validate } from "../middleware/validate";
import {
  signInValidation,
  signUpValidation,
  refreshToken,
} from "../middleware/auth";
import { getMe, signIn, signUp } from "../controllers/auth";
import { authenticated } from "../helpers/token";

const router = Router();

router.post("/sign-up", signUpValidation(), validate, signUp);
router.post("/sign-in", signInValidation(), validate, signIn);
router.post("/refresh-token", refreshToken, validate);

router.get("/me", authenticated, validate, getMe);

export default router;
