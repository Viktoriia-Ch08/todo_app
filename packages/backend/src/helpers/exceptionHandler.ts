import { ActionType, HandlerType } from '@/types/middlewares.type';
import { Request, Response, NextFunction } from 'express';

export const exceptionHandler = (action: ActionType): HandlerType => {
	const handler = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await action(req, res);
		} catch (err) {
			next(err);
		}
	};
	return handler;
};
