import Joi from 'joi';

export const signupSchema = Joi.object({
	username: Joi.string()
		.min(2)
		.max(50)
		.required()
		.messages({ 'any.required': 'missing required username field' }),
	email: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required email field' }),
	password: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required password field' }),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
});
