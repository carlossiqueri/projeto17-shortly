import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { signUpSchema } from "../schemas/userSignUp.schemas.js";
import {signInSchema} from "../schemas/userSignIn.schema.js";
import { signUp, signIn } from "../controllers/users.controllers.js";

const usersRoutes = Router();
usersRoutes.post("/signup", validateSchema(signUpSchema), signUp);
usersRoutes.post("/signIn",validateSchema(signInSchema), signIn);

export default usersRoutes;
