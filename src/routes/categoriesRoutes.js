import { Router } from "express";
import { getCategories } from "../controles/categoriesControle.js";

const categoriesRouter = Router();
categoriesRouter.get("/categories", getCategories);

export default categoriesRouter;
