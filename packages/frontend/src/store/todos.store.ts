import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ITodosStore } from '~shared/interfaces/todo-store-interface';
import { todoService } from '~shared/services/todo-service';
import {
	TodoCreateType,
	TodoUpdateType,
	TodosQueryType,
} from '~shared/types/todo-types';

export const useTodoStore = create<ITodosStore>()(
	immer((set) => {
		return {
			todosData: null,
			todoDetails: null,
			loading: false,
			query: null,

			fetchTodos: async (query): Promise<void> => {
				set({ loading: true });
				try {
					const response = await todoService.fetchTodos(query);
					set((state) => {
						state.loading = false;
						state.todosData = response;
					});
				} catch (error) {
					set({ loading: false });
				}
			},
			fetchAndAppendTodos: async (query): Promise<void> => {
				set({ loading: true });
				try {
					const response = await todoService.fetchTodos(query);

					set((state) => {
						state.loading = false;
						const currentTodos = state.todosData?.todos ?? [];
						state.todosData = {
							...response,
							todos: [...currentTodos, ...response.todos],
						};
					});
				} catch (error) {
					set({ loading: false });
				}
			},
			clearTodos: (): void => {
				set((state) => {
					state.todosData = null;
				});
			},

			fetchTodoById: async (id: number): Promise<void> => {
				set({ loading: true });
				try {
					const response = await todoService.fetchTodoById(id);
					set({ loading: false, todoDetails: response });
				} catch (error) {
					set({ loading: false });
				}
			},
			addTodo: async (data: TodoCreateType): Promise<void> => {
				set({ loading: true });
				try {
					const response = await todoService.addTodo(data);
					set((state) => {
						state.loading = false;
						state.todosData.todos.unshift(response);
					});
				} catch (error) {
					set({ loading: false });
				}
			},
			updateTodoById: async (
				id: number,
				data: TodoUpdateType,
			): Promise<void> => {
				set({ loading: true });
				try {
					const response = await todoService.updateTodo(id, data);
					set((state) => {
						state.loading = false;
						state.todosData.todos = state.todosData.todos.map(
							(todo) => {
								if (todo.id === response.id) return response;
								return todo;
							},
						);
						state.todoDetails = response;
					});
				} catch (error) {
					set({ loading: false });
				}
			},
			deleteTodoById: async (id: number): Promise<void> => {
				set({ loading: true });
				try {
					const response = await todoService.deleteTodo(id);
					set((state) => {
						(state.loading = false),
							(state.todosData.todos =
								state.todosData.todos.filter(
									(todo) => response.id !== todo.id,
								));
					});
				} catch (error) {
					set({ loading: false });
				}
			},

			setQuery: (query: TodosQueryType): void => {
				set((state) => {
					state.query = query;
				});
			},
		};
	}),
);
