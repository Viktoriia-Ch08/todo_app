import Joi from 'joi';

export const putSchema = Joi.object({
	title: Joi.string().min(1).max(200),
	description: Joi.string(),
	isCompleted: Joi.boolean(),
	isPrivate: Joi.boolean(),
});
