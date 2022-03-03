import connection from "../connection.js";

export async function getRentals(req, res) {
	try {
		const customerId = req.query.customerId;
		const gameId = req.query.gameId;

		if (customerId) {
			const filterRentals = await connection.query(
				`SELECT * FROM rentals WHERE customerId LIKE $1`,
				[customerId + "%"]
			);
			return res.send(filterRentals.rows);
		}

		if (gameId) {
			const filterRentals = await connection.query(
				`SELECT * FROM rentals WHERE gameId LIKE $1`,
				[gameId + "%"]
			);
			return res.send(filterRentals.rows);
		}

		const allRentals = await connection.query("SELECT * FROM rentals");
		res.send(allRentals.rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
