import { TodosDataType } from '~shared/types/todo-types';
import TodoItem from '../todo-item/todo-item.component';
import { todoList } from './todo-list.css.component';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { notFoundTodosText } from '~modules/todos/todos-page.styles';

type TodoListProps = {
	todosData: TodosDataType;
	incrementPage: () => void;
};

const TodoList: React.FC<TodoListProps> = ({
	todosData,
	incrementPage,
}): JSX.Element => {
	useBottomScrollListener(() => {
		if (todosData.currentPage >= todosData.totalPages) {
			return;
		}
		incrementPage();
	});
	return (
		<>
			{todosData && todosData.todos.length ? (
				<ul className={todoList}>
					{todosData.todos.map((todo) => {
						return (
							<TodoItem
								todo={todo}
								key={`${todo.id}${todo.title}`}
							/>
						);
					})}
				</ul>
			) : (
				<p className={notFoundTodosText}>You don't have any todos</p>
			)}
		</>
	);
};

export default TodoList;
