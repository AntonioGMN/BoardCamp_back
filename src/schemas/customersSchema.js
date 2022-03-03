import joi from "joi";

const customerSchema = joi.object({
	name: joi.string().required(),
	phone: joi
		.string()
		.required()
		.regex(/^[0-9]{10,11}$/),
	cpf: joi
		.string()
		.required()
		.regex(/^[0-9]{11}$/),
	birthday: joi
		.string()
		.required()
		.regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
});

export default customerSchema;
