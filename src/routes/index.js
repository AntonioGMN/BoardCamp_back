import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";
import gameRouter from "./gamesRoutes.js";

const router = Router();
router.use(categoriesRouter);
router.use(gameRouter);

export default router;
