import joi from "joi";

const rentalSchema = joi.object({
	customerId: joi.number().positive().greater(0).required(),
	gameId: joi.number().positive().greater(0).required(),
	daysRented: joi.number().positive().greater(0).required(),
});

export default rentalSchema;
