import { ResponseError } from '@/types/todos.type';

export const HttpError = (status: number, message: string): ResponseError => {
	const error = new Error(message) as ResponseError;
	error.status = status;
	return error;
};
