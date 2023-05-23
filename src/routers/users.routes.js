import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { authValidate } from "../middlewares/auth.middleware.js";
import { signUpSchema } from "../schemas/userSignUp.schemas.js";
import { signInSchema } from "../schemas/userSignIn.schema.js";
import {
  signUp,
  signIn,
  userProfile,
} from "../controllers/users.controllers.js";

const usersRoutes = Router();
usersRoutes.post("/signup", validateSchema(signUpSchema), signUp);
usersRoutes.post("/signIn", validateSchema(signInSchema), signIn);
usersRoutes.get("/users/me", authValidate, userProfile);

export default usersRoutes;
