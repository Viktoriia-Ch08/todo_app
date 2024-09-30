import { TodoCreateType, TodoType } from '~shared/types/todo-types';

export const todoUndefinedInit = {
	title: '',
	description: '',
	isCompleted: false,
	isPrivate: false,
};

export const getInitValue = (todo: TodoCreateType): TodoType | undefined => {
	if (todo === undefined) {
		return todoUndefinedInit;
	} else {
		const { title, description, isCompleted, isPrivate } = todo;
		return { title, description, isCompleted, isPrivate };
	}
};
