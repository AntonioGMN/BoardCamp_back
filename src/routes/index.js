import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";
import customersRouter from "./customersRoutes.js";
import gameRouter from "./gamesRoutes.js";

const router = Router();
router.use(categoriesRouter);
router.use(gameRouter);
router.use(customersRouter);

export default router;
