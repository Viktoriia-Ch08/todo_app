import { UserType } from '@/types/auth.type';
import { PrismaModelType } from '@/types/prisma.type';
import { NextFunction, Request, Response } from 'express';

export function isExistAndBelongTo<TEntity>(
	modelName: PrismaModelType<TEntity>,
	ownerColumn: keyof TEntity,
) {
	return async function (
		req: Request,
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

		const user = req.user as UserType;

		if (result![ownerColumn] !== user.id) {
			res.status(403);
			res.json(`${id} forbidden`);
			return;
		}

		next();
	};
}
