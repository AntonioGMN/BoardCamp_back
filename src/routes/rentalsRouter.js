import { Router } from "express";
import {
	getRentals,
	postRentals,
	finishRental,
	deleteRental,
} from "../controles/rentalsControles.js";
import validateRental from "../middlewares/validateRental.js";

const rentalRouter = Router();
rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals", validateRental, postRentals);
rentalRouter.post("/rentals/:id/return", finishRental);
rentalRouter.delete("/rentals/:id", deleteRental);

export default rentalRouter;
