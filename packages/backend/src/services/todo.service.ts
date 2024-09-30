import {
	AddTodoType,
	TodoQueryType,
	TodoType,
	TodosAllType,
	UpdateTodoType,
} from '@/types/todos.type';
import { prisma } from './prisma.service';
import { HttpError } from '@/helpers/HttpError';
import { Prisma } from '@prisma/client';
export default class TodoService {
	async findAll(userId: number, query: TodoQueryType): Promise<TodosAllType> {
		const skip = (query.page - 1) * query.limit;

		let isPrivateFilter = [];
		switch (query.isPrivate) {
			case undefined:
				isPrivateFilter = [{ OR: [{ userId }, { isPrivate: false }] }];
				break;
			case true:
				isPrivateFilter = [{ userId }, { isPrivate: true }];
				break;
			case false:
				isPrivateFilter = [{ isPrivate: false }];
				break;
		}

		const searchCondition: Prisma.TodoItemWhereInput = {
			AND: [
				...isPrivateFilter,
				{
					title: {
						contains: query.search,
						mode: 'insensitive',
					},
				},
				{ isCompleted: query.isCompleted },
			],
		};

		const result = await prisma.todoItem.findMany({
			where: searchCondition,
			orderBy: {
				userId: 'asc',
			},
			skip: skip,
			take: query.limit,
		});

		const totalCount = await prisma.todoItem.count({
			where: searchCondition,
		});

		const todosData = {
			totalRecords: totalCount,
			currentPage: query.page,
			totalPages: Math.ceil(totalCount / query.limit),
			todos: result,
		};

		return todosData;
	}

	async findItemById(id: number, userId: number): Promise<TodoType> {
		const todo = await prisma.todoItem.findUnique({
			where: {
				id,
			},
		});

		if (todo!.isPrivate && todo!.userId !== userId) {
			throw HttpError(404, 'Not found');
		}

		return todo!;
	}

	async addItem(todoItem: AddTodoType, userId: number): Promise<TodoType> {
		const result = await prisma.todoItem.create({
			data: { ...todoItem, userId },
		});

		return result;
	}

	async updateItem(todoItem: UpdateTodoType, id: number): Promise<TodoType> {
		const result = await prisma.todoItem.update({
			where: {
				id,
			},
			data: todoItem,
		});

		return result;
	}

	async deleteItem(id: number): Promise<TodoType> {
		const result = await prisma.todoItem.delete({
			where: {
				id,
			},
		});

		return result;
	}
}
