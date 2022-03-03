import connection from "../connection.js";
import dayjs from "dayjs";
dayjs.locale("pt-br");

export async function getRentals(req, res) {
	try {
		const customerId = req.query.customerId;
		const gameId = req.query.gameId;

		const games = await connection.query("select * from games");
		const customers = await connection.query("select (id,name) from customers");
		const rentals = await connection.query("select * from rentals");
		console.log(customers.rows);
		console.log(games.rows);

		const result = rentals.rows.map((rentals) => ({
			...rentals,
			customer: customers.rows.find(
				(customer) => customer.id === rentals.customerId
			),
			game: games.rows.find((game) => game.id === rentals.gameId),
		}));

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

		const allRentals = await connection.query(
			`SELECT * FROM rentals JOIN customers ON rentals."customerId"=customers.id`
		);
		res.send(result);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function postRentals(req, res) {
	try {
		const { customerId, gameId, daysRented } = req.body;
		const rentDate = dayjs().format("YYYY-MM-DD");

		const game = await connection.query("select * from games where id=$1", [
			gameId,
		]);
		const { pricePerDay, stockTotal } = game.rows[0];
		const originalPrice = daysRented * pricePerDay;

		const rented = await connection.query(
			`select * from rentals where "gameId"=$1`,
			[game.rows[0].id]
		);

		if (rented.rows.length < stockTotal) {
			await connection.query(
				`insert into rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") values ($1,$2,$3,$4,$5,$6,$7)`,
				[customerId, gameId, rentDate, daysRented, null, originalPrice, null]
			);
		} else {
			return res.status(400).send("No have this game in stock");
		}
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
