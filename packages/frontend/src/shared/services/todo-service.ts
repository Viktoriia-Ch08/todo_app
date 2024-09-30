import {
	TodoCreateType,
	TodoType,
	TodoUpdateType,
	TodosDataType,
	TodosQueryType,
} from '~shared/types/todo-types';
import { HttpSerivce } from './http-service';
import { ApiTodoEndpoints } from '~shared/keys/api-keys';

class TodoService extends HttpSerivce {
	constructor() {
		super();
	}
	async fetchTodos(query: TodosQueryType): Promise<TodosDataType> {
		const response = await this.get<TodosDataType>({
			url: ApiTodoEndpoints.ALL,
			params: query,
		});
		return response.data;
	}
	async fetchTodoById(id: number): Promise<TodoType> {
		const response = await this.get<TodoType>({
			url: ApiTodoEndpoints.TODOS_ID(id),
		});
		return response.data;
	}
	async addTodo(data: TodoCreateType): Promise<TodoType> {
		const response = await this.post<TodoCreateType, TodoType>({
			url: ApiTodoEndpoints.CREATE,
			data,
		});
		return response.data;
	}
	async updateTodo(id: number, data: TodoUpdateType): Promise<TodoType> {
		const response = await this.put<TodoUpdateType, TodoType>({
			url: ApiTodoEndpoints.TODOS_ID(id),
			data,
		});
		return response.data;
	}
	async deleteTodo(id: number): Promise<TodoType> {
		const response = await this.delete<TodoType>({
			url: ApiTodoEndpoints.TODOS_ID(id),
		});
		return response.data;
	}
}

export const todoService = new TodoService();
