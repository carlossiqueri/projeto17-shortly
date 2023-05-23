import { Router } from "express";
import usersRoutes from "./users.routes.js";
import urlRoute from "./url.routes.js";
import rankingRouter from "./ranking.routes.js";

const router = Router();
router.use(usersRoutes);
router.use(urlRoute);
router.use(rankingRouter);

export default router;
