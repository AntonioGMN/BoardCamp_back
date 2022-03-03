import { Router } from "express";
import { getRentals } from "../controles/rentalsControles.js";

const rentalRouter = Router();
rentalRouter.get("/rentals", getRentals);
