import connection from "../connection.js";

export async function getCategories(req, res) {
	try {
		const promessa = await connection.query("SELECT * FROM categories");
		res.send(promessa.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("erro");
	}
}

export async function postCategories(req, res) {
	try {
		const newCategory = req.body.name;
		if (newCategory === undefined || newCategory.length === 0)
			return res.sendStatus(400);

		const promise = await connection.query("SELECT * FROM categories");
		const categories = promise.rows;
		const alreadCreated = categories.find((c) => c.name === newCategory);

		if (alreadCreated) return res.sendStatus(409);

		await connection.query("INSERT INTO categories (name) VALUES ($1)", [
			newCategory,
		]);

		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.status(500).send("erro");
	}
}
