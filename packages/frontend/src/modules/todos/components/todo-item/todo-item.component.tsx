import { TodoType } from '~shared/types/todo-types';
import { todoItem } from './todo-item.styles';
import TodoCard from '~shared/components/card/card.component';

type TodoItemType = {
	todo: TodoType;
};

const TodoItem: React.FunctionComponent<TodoItemType> = ({ todo }) => {
	return (
		<>
			<li className={todoItem}>
				<TodoCard todo={todo} />
			</li>
		</>
	);
};

export default TodoItem;
