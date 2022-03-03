import connection from "../connection.js";

export async function getCustomers(req, res) {
	try {
		const cpf = req.query.cpf;

		if (cpf) {
			const filterCustomers = await connection.query(
				`SELECT * FROM customers WHERE cpf LIKE $1`,
				[cpf + "%"]
			);
			return res.send(filterCustomers.rows);
		}

		const allCustomers = await connection.query("SELECT * FROM customers");
		res.send(allCustomers.rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function getCustomersId(req, res) {
	try {
		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			return res.sendStatus(400);
		}

		const result = await connection.query("SELECT * FROM customers WHERE id=$1", [
			id,
		]);

		if (result.rows.length === 0) {
			return res.sendStatus(404);
		}

		res.send(result.rows);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function postCustomers(req, res) {
	try {
		const customer = req.body;
		console.log(customer);

		await connection.query(
			`INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`,
			[customer.name, customer.phone, customer.cpf, customer.birthday]
		);

		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.Status(500).send(err);
	}
}

export async function putCustomers(req, res) {
	try {
		const id = parseInt(req.params.id);
		const { name, phone, cpf, birthday } = req.body;
		console.log(req.body);
		console.log(id);

		if (isNaN(id)) {
			return res.sendStatus(400);
		}

		await connection.query(
			`UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5`,
			[name, phone, cpf, birthday, id]
		);

		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.Status(500).send(err);
	}
}
