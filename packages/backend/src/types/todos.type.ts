import { TodoItem } from '@prisma/client';

export type TodoType = TodoItem;
export type AddTodoType = Omit<TodoItem, 'userId'>;
export type UpdateTodoType = Omit<TodoItem, 'userId'>;

export type TodosAllType = {
	totalRecords: number;
	currentPage: number;
	totalPages: number;
	todos: TodoType[];
};

export interface ResponseError extends Error {
	status?: number;
}

export type TodoQueryType = {
	isPrivate?: boolean;
	isCompleted?: boolean;
	search?: string;
	page: number;
	limit: number;
};
