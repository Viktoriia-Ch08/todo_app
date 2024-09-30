import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';
import { UserType } from '@/types/auth.type';
import { TodoQueryType } from '@/types/todos.type';
import { TODOS_DEFAULT_LIMIT } from '@/constants/todos-config';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;

		const page = req.query.page
			? this.parseInt(req.query.page as string)
			: 1;

		const limit = req.query.limit
			? this.parseInt(req.query.limit as string)
			: TODOS_DEFAULT_LIMIT;

		const query = {
			isPrivate: this.parseBoolean(req.query.isPrivate as string),
			isCompleted: this.parseBoolean(req.query.isCompleted as string),
			search: req.query.search,
			page,
			limit,
		} as TodoQueryType;

		const todosData = await this.todoService.findAll(user.id, query);
		res.send(todosData);
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const { id } = req.params;
		const todo = await this.todoService.findItemById(+id, user.id);
		res.send(todo);
	}

	async addTodoItem(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const todoItem = await this.todoService.addItem(req.body, user.id);
		res.send(todoItem);
	}

	async updateTodoItem(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todoItem = await this.todoService.updateItem(req.body, +id);
		res.send(todoItem);
	}

	async deleteTodoItem(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todoItem = await this.todoService.deleteItem(+id);
		res.send(todoItem);
	}

	private parseBoolean = (value: string | undefined): boolean | undefined =>
		!value ? undefined : value.toLowerCase() === 'true';

	private parseInt = (value: string | undefined): number | undefined =>
		!value ? undefined : Number(value);
}

const todoController = new TodoController(new TodoService());
export default todoController;
