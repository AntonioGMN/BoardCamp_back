import connection from "../connection.js";
import customerSchema from "../schemas/customersSchema.js";

export default async function validateCostumers(req, res, next) {
	const customers = req.body;

	const validation = customerSchema.validate(customers);
	if (validation.error) {
		const messageErro = validation.error.message;
		return res.Status(400).send(messageErro);
	}

	console.log("passou da valideCustomers");
	next();
}
