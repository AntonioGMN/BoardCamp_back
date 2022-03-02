import connection from "../connection.js";

export async function getGames(req, res) {
	try {
		const query = req.query.name;
		console.log(query);

		if (query) {
			const filterGames = await connection.query(
				`SELECT games.*, categories.name as categoryName FROM games JOIN categories ON games."categoryId"=categories.id`
			);
			return res.send(filterGames.rows);
		}

		const allGames = await connection.query(
			`SELECT games.*, categories.name as categoryName FROM games JOIN categories ON games."categoryId"=categories.id`
		);
		res.send(allGames.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("erro");
	}
}

export async function postGames(req, res) {
	try {
		const newGame = {
			...req.body,
			stockTotal: Number(req.body.stockTotal),
			pricePerDay: Number(req.body.pricePerDay),
		};

		await connection.query(
			`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5)`,
			[
				newGame.name,
				newGame.image,
				newGame.stockTotal,
				newGame.categoryId,
				newGame.pricePerDay,
			]
		);

		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.status(500).send("erro");
	}
}
