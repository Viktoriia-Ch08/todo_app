import { HttpError } from '@/helpers/HttpError';
import { Request, Response, NextFunction } from 'express';

export const isBodyEmpty = (
	req: Request,
	_: Response,
	next: NextFunction,
): void => {
	if (Object.keys(req.body).length === 0) {
		next(HttpError(400, 'missing fields'));
	}
	next();
};
