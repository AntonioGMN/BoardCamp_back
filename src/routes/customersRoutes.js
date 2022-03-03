import { Router } from "express";
import {
	getCustomers,
	getCustomersId,
	postCustomers,
	putCustomers,
} from "../controles/costumersControler.js";
import validateCostumers from "../middlewares/validateCostumers.js";

const customersRouter = Router();
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersId);
customersRouter.post("/customers", validateCostumers, postCustomers);
customersRouter.put("/customers/:id", validateCostumers, putCustomers);

export default customersRouter;
