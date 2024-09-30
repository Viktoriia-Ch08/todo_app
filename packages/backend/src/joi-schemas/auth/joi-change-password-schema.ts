import Joi from 'joi';

export const changePasswordSchema = Joi.object({
	email: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required email field' }),
	password: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required password field' }),
	newPassword: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required newPassword field' }),
});
