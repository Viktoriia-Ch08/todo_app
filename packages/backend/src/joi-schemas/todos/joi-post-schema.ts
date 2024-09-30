import Joi from 'joi';

export const postSchema = Joi.object({
	title: Joi.string()
		.min(1)
		.max(200)
		.required()
		.messages({ 'any.required': 'missing required title field' }),
	description: Joi.string()
		.required()
		.messages({ 'any.required': 'missing required description field' }),
	isCompleted: Joi.boolean(),
	isPrivate: Joi.boolean(),
});
