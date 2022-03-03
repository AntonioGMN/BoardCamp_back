import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";
import customersRouter from "./customersRoutes.js";
import gameRouter from "./gamesRoutes.js";
import rentalRouter from "./rentalsRouter.js";

const router = Router();
router.use(categoriesRouter);
router.use(gameRouter);
router.use(customersRouter);
router.use(rentalRouter);

export default router;
