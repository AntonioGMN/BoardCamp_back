import { Router } from "express";
import {
	getCategories,
	postCategories,
} from "../controles/categoriesControle.js";

const categoriesRouter = Router();
categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", postCategories);

export default categoriesRouter;
