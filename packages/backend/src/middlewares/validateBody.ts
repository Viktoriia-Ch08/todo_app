import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/helpers/HttpError';
import { HandlerType } from '@/types/middlewares.type';

export function validateBody(schema: Schema): HandlerType {
	const handler = async (
		req: Request,
		_: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			next(HttpError(400, (error as Error).message));
		}
	};
	return handler;
}
