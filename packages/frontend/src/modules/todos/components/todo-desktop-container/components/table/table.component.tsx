import { Icon } from '@blueprintjs/core';
import { useTodoStore } from '~store/todos.store';
import { tableBtnWrap, todoTableItem } from './table.styles.js';
import Button from '~shared/components/button/button.component.js';
import Modal from '~shared/components/modal/modal.component.js';
import TodoForm from '~modules/todos/components/todo-form/todo-form.component.js';
import { useState } from 'react';
import { TodoType, TodoUpdateType } from '~shared/types/todo-types.js';
import { useAuthStore } from '~store/auth.store.js';

type TodoTableElType = {
	todo: TodoType;
};

const TodoTableEL = ({ todo }: TodoTableElType): React.ReactNode => {
	const deleteTodo = useTodoStore((state) => state.deleteTodoById);
	const updateTodo = useTodoStore((state) => state.updateTodoById);
	const user = useAuthStore((state) => state.user);

	const [show, setShow] = useState(false);

	const handleEdit = async (newTodo: TodoUpdateType): Promise<void> => {
		try {
			await updateTodo(todo.id, newTodo);
			setShow(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<tr>
				<td className={todoTableItem}>{todo.title}</td>
				<td className={todoTableItem}>{todo.description}</td>
				{todo.userId === user.id ? (
					<>
						<td className={todoTableItem}>
							<div className={tableBtnWrap}>
								<Button
									type="button"
									icon={<Icon icon="edit" size={20} />}
									onClick={() => setShow(true)}
								/>
							</div>
						</td>
						<td className={todoTableItem}>
							<div className={tableBtnWrap}>
								<Button
									type="button"
									onClick={() => deleteTodo(todo.id)}
									icon={<Icon icon="trash" size={20} />}
								/>
							</div>
						</td>
					</>
				) : (
					<>
						<td className={todoTableItem}></td>
						<td className={todoTableItem}></td>
					</>
				)}
			</tr>

			<Modal setShow={setShow} show={show}>
				<TodoForm todo={todo} onSubmitHandler={handleEdit} />
			</Modal>
		</>
	);
};

export default TodoTableEL;
