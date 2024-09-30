import { HTMLTable } from '@blueprintjs/core';
import TodoTableEL from './components/table/table.component';
import {
	paginationWrapper,
	todoTable,
	todoTableHeader,
} from './todo-desctop-container.styles';
import { TodosDataType } from '~shared/types/todo-types';
import { ToastContent } from 'react-toastify';
import Button from '~shared/components/button/button.component';
import { notFoundTodosText } from '~modules/todos/todos-page.styles';

type TodoDesktop = {
	todosData: TodosDataType;
	incrementPage: () => ToastContent | void;
	decrementPage: () => void;
	isLastPage: boolean;
	page: number;
};

const TodoDesktopContainer = ({
	todosData,
	incrementPage,
	decrementPage,
	isLastPage,
	page,
}: TodoDesktop): React.ReactNode => {
	return (
		<>
			{todosData && todosData.todos.length ? (
				<>
					<HTMLTable className={todoTable}>
						<tbody>
							<tr>
								<th className={todoTableHeader}>Title</th>
								<th className={todoTableHeader}>Description</th>
								<th className={todoTableHeader}>Update</th>
								<th className={todoTableHeader}>Delete</th>
							</tr>
							{todosData.todos.map((todo) => (
								<TodoTableEL key={todo.id} todo={todo} />
							))}
						</tbody>
					</HTMLTable>
					{!(todosData.totalPages === 1) && (
						<div className={paginationWrapper}>
							<Button
								disabled={page === 1}
								onClick={decrementPage}
								text="<"
							/>
							<p>{page}</p>
							<Button
								disabled={isLastPage}
								onClick={incrementPage}
								text=">"
							/>
						</div>
					)}
				</>
			) : (
				<p className={notFoundTodosText}>You don't have any todos</p>
			)}
		</>
	);
};

export default TodoDesktopContainer;
