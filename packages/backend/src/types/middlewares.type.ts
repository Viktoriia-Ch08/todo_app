import { Request, Response, NextFunction } from 'express';

export type ActionType = (req: Request, res: Response) => Promise<void>;

export type HandlerType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;
