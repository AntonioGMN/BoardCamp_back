import connection from "../connection.js";

export async function getGames(req, res) {
	try {
		const query = req.query.name;
		//if (query) {
		const promessa = await connection.query("SELECT * FROM games");
		res.send(promessa.rows);
		//}
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
		//console.log(newGame);

		const validCategoryIds = await (
			await connection.query("SELECT (id) FROM categories")
		).rows;
		//console.log(validCategoryIds);

		const validId = validCategoryIds.find((i) => i.id === newGame.categoryId);
		//console.log(validId);

		if (!validId) return res.sendStatus(400);

		const gameNames = await (
			await connection.query("SELECT (name) FROM games")
		).rows;

		const validGameName = gameNames.find((g) => g.name === newGame.name);
		//console.log(validGameName);

		if (validGameName) return res.sendStatus(409);

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
