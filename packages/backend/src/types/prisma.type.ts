import { PrismaPromise } from '@prisma/client';

export type PrismaModelType<T> = {
	findUnique: (args: { where: { id: number } }) => PrismaPromise<T | null>;
};
