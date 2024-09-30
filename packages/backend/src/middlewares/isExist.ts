import { PrismaModelType } from '@/types/prisma.type';
import { Request, Response, NextFunction } from 'express';

export function isExist<T>(modelName: PrismaModelType<T>) {
	return async function (
		req: Request<{ id: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { id } = req.params;
		const idAsNumber = +id;

		if (isNaN(idAsNumber)) {
			res.status(400);
			res.json(`${id} is not valid id`);
			return;
		}

		const result = await modelName.findUnique({
			where: { id: idAsNumber },
		});

		if (result === null) {
			res.status(404);
			res.json(`${id} does not exist`);
			return;
		}

		next();
	};
}
