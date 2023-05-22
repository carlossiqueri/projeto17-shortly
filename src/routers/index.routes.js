import { Router } from "express";
import usersRoutes from "./users.routes.js";
import urlRoute from "./url.routes.js";

const router = Router();
router.use(usersRoutes);
router.use(urlRoute);

export default router;
