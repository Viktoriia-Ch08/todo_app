import Joi from 'joi';

export const forgetPasswordSchema = Joi.object({
	email: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required email field' }),
});
