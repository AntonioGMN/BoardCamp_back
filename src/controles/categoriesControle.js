import connection from "../connection.js";

export async function getCategories(req, res) {
	try {
		const promessa = await connection.query("SELECT * FROM categories");
		console.log(promessa.rows);
		res.send(promessa.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("erro");
	}
}
