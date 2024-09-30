export type TodoType = {
	id?: number;
	title: string;
	description: string;
	isCompleted: boolean;
	isPrivate: boolean;
	userId?: number;
};

export type TodosDataType = {
	currentPage: number;
	todos: TodoType[];
	totalPages: number;
	totalRecords: number;
};

export type TodoUpdateType = {
	title?: string;
	description?: string;
	isCompleted?: boolean;
	isPrivate?: boolean;
};

export type TodoCreateType = {
	title: string;
	description: string;
	isCompleted?: boolean;
	isPrivate?: boolean;
};

export type TodosQueryType = {
	search?: string;
	isPrivate?: boolean;
	isCompleted?: boolean;
	page?: number;
	limit?: number;
};
