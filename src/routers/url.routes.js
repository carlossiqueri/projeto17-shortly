import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { authValidate } from "../middlewares/auth.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";
import { urlShorten, urlById } from "../controllers/urls.controllers.js";

const urlRoute = Router();

urlRoute.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  authValidate,
  urlShorten
);

urlRoute.get("/urls/:id", urlById)

export default urlRoute;
