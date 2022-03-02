import { Router } from "express";
import { getCustomers } from "../controles/costumersControler.js";

const customersRouter = Router();
customersRouter.get("/customers", getCustomers);

export default customersRouter;
