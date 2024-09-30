import {
	TodoCreateType,
	TodoType,
	TodoUpdateType,
	TodosDataType,
	TodosQueryType,
} from '../types/todo-types';

export interface ITodosStore {
	todosData: TodosDataType;
	todoDetails: TodoType;
	loading: boolean;
	query: TodosQueryType;

	fetchTodos: (query: TodosQueryType) => Promise<void>;
	fetchAndAppendTodos: (query: TodosQueryType) => Promise<void>;
	clearTodos: () => void;
	fetchTodoById: (id: number) => Promise<void>;
	addTodo: (data: TodoCreateType) => Promise<void>;
	updateTodoById: (id: number, data: TodoUpdateType) => Promise<void>;
	deleteTodoById: (id: number) => Promise<void>;
	setQuery: (query: TodosQueryType) => void;
}
