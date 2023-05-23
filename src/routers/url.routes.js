import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { authValidate } from "../middlewares/auth.middleware.js";
import { validateUrlId, validateOpenUrl, validateDelete } from "../middlewares/url.middlewares.js";
import { urlSchema } from "../schemas/url.schema.js";
import { urlShorten, urlById, redirectUrl, deleteUserUrl } from "../controllers/urls.controllers.js";

const urlRoute = Router();

urlRoute.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  authValidate,
  urlShorten
);

urlRoute.get("/urls/:id", validateUrlId,urlById);
urlRoute.get("/urls/open/:shortUrl", validateOpenUrl, redirectUrl);
urlRoute.delete("/urls/:id",authValidate,validateUrlId,validateDelete, deleteUserUrl);

export default urlRoute;
