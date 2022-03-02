import connection from "../connection.js";

export default async function validateGame(req, res, next) {
	const categoryIds = await (
		await connection.query("SELECT (id) FROM categories")
	).rows;

	const validateId = categoryIds.find((i) => i.id === req.body.categoryId);
	if (!validateId) return res.sendStatus(400);

	const gameNames = await (
		await connection.query("SELECT (name) FROM games")
	).rows;

	const validGameName = gameNames.find((g) => g.name === req.body.name);
	if (validGameName) return res.sendStatus(409);

	next();
}
