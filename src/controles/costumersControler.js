import connection from "../connection.js";

export async function getCustomers(req, res) {
	try {
		const query = req.query.cpf;
		console.log(query);

		if (query) {
			const filterCustomers = await connection.query(
				`SELECT * FROM customers WHERE cpf LIKE '%${query}%'`
			);
			return res.send(filterCustomers.rows);
		}

		const allCustomers = await connection.query("SELECT * FROM customers");
		res.send(allCustomers.rows);
	} catch (err) {
		console.log(err);
		res.status(500).send("erro");
	}
}
