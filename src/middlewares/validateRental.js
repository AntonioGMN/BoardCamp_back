import rentalSchema from "../schemas/rentalsSchema.js";
import connection from "../connection.js";

export default async function validateRental(req, res, next) {
	const rental = req.body;

	const validation = rentalSchema.validate(rental);
	if (validation.error) {
		const messageErro = validation.error.message;
		return res.status(400).send(messageErro);
	}

	const validCustomersIds = await connection.query(
		"select id from customers where id=$1",
		[rental.customerId]
	);
	if (validCustomersIds.rows.length === 0)
		return res.status(400).send("invalid CustomerId");

	const validGamesIds = await connection.query(
		"select id from games where id=$1",
		[rental.gameId]
	);
	if (validGamesIds.rows.length === 0)
		return res.status(400).send("invalid GamesId");

	console.log("passou da validerental");
	next();
}
