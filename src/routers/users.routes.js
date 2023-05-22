import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { signUpSchema } from "../schemas/userSignUp.schemas.js";
import { signUp } from "../controllers/users.controllers.js";

const usersRoutes = Router();
usersRoutes.post("/signup", validateSchema(signUpSchema), signUp);

export default usersRoutes;
