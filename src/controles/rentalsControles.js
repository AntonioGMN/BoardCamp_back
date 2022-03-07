import connection from "../connection.js";
import moment from "moment";
import dayjs from "dayjs";
dayjs.locale("pt-br");

export async function getRentals(req, res) {
	try {
		const customerId = req.query.customerId;
		const gameId = req.query.gameId;
		let rentals;

		const games = await connection.query(
			`SELECT games.id,games.name, categories.id as "categoryId", categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id`
		);
		const customers = await connection.query("select id,name from customers");

		if (customerId && gameId) {
			rentals = await connection.query(
				`select * from rentals where "customerId"=$1 and "gameId"=$2`,
				[customerId],
				[gameId]
			);
		} else if (customerId) {
			rentals = await connection.query(
				`select * from rentals where "customerId"=$1`,
				[customerId]
			);
		} else if (gameId) {
			rentals = await connection.query(`select * from rentals where "gameId"=$1`, [
				gameId,
			]);
		} else {
			rentals = await connection.query("select * from rentals");
		}

		if (!rentals) return res.send([]);
		const result = rentals.rows.map((rentals) => ({
			...rentals,
			customer: customers.rows.find(
				(customer) => customer.id === rentals.customerId
			),
			game: games.rows.find((game) => game.id === rentals.gameId),
		}));

		res.send(result);
	} catch (erro) {
		console.log(erro);
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

export async function finishRental(req, res) {
	try {
		const id = parseInt(req.params.id);
		let delayFee = 0;

		const rental = await connection.query("select * from rentals where id=$1", [
			id,
		]);
		if (rental.rows.length === 0) return res.sendStatus(404);

		const { rentDate, daysRented, originalPrice } = rental.rows[0];
		const lastRentalDay = moment(rentDate).add(daysRented, "days");
		const currentDate = dayjs().format("YYYY-MM-DD");

		const diff = moment(currentDate, "YYYY-MM-DD").diff(
			moment(lastRentalDay, "YYYY-MM-DD")
		);
		const daysDiff = moment.duration(diff).asDays();

		if (daysDiff > 0) {
			delayFee = daysDiff * (originalPrice / daysRented);
		}
		console.log(delayFee);
		console.log(id);

		await connection.query(
			`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,
			[currentDate, delayFee, id]
		);
		res.sendStatus(200);
	} catch (erro) {
		res.status(500).send(erro);
	}
}

export async function deleteRental(req, res) {
	try {
		const id = parseInt(req.params.id);

		const rental = await connection.query("select * from rentals where id=$1", [
			id,
		]);
		if (rental.rows.length === 0) return res.sendStatus(404);

		const { returnDate } = rental.rows[0];

		if (returnDate === null) return res.sendStatus(400);

		await connection.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
		res.sendStatus(200);
	} catch (erro) {
		res.status(500).send(erro);
	}
}
