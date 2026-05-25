import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import { signup,signin } from "../controller/auth-controller";
export const authRouter=Router();

authRouter.post("/signup",asyncHandler(signup));
authRouter.post("signin",asyncHandler(signin));