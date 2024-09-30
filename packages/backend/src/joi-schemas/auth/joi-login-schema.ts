import Joi from 'joi';

export const loginSchema = Joi.object({
	email: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required email field' }),
	password: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required password field' }),
});
