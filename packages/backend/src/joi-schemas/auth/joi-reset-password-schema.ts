import Joi from 'joi';

export const resetPasswordSchema = Joi.object({
	newPassword: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required newPassword field' }),
});
