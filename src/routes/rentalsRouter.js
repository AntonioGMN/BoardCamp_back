import { Router } from "express";
import { getRentals, postRentals } from "../controles/rentalsControles.js";
import validateRental from "../middlewares/validateRental.js";

const rentalRouter = Router();
rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals", validateRental, postRentals);

export default rentalRouter;
