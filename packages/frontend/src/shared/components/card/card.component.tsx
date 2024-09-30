import { Card, Elevation, Icon, Switch } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import {
	todoBtnContainer,
	todoCard,
	todoDescr,
	todoTextContainer,
	todoTitle,
	todoViewLink,
	todoWrapper,
} from './card.styled';
import Button from '../button/button.component';
import React, { ChangeEventHandler, useState } from 'react';
import { useTodoStore } from '~store/todos.store';
import Modal from '../modal/modal.component';
import TodoForm from '../../../modules/todos/components/todo-form/todo-form.component';
import { TodoType, TodoUpdateType } from '~shared/types/todo-types';
import { useAuthStore } from '~store/auth.store';

type TodoCardType = {
	todo: TodoType;
};

const TodoCard: React.FC<TodoCardType> = ({ todo }): React.ReactNode => {
	const [show, setShow] = useState(false);
	const deleteTodo = useTodoStore((state) => state.deleteTodoById);
	const updateTodo = useTodoStore((state) => state.updateTodoById);
	const { id, title, description, isCompleted, isPrivate } = todo;
	const todoForForm = { title, description, isCompleted, isPrivate };
	const user = useAuthStore((state) => state.user);

	const handleEdit = async (todo: TodoUpdateType): Promise<void> => {
		try {
			await updateTodo(+id, todo);
			setShow(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSwitchChange: ChangeEventHandler<HTMLInputElement> = async (
		event,
	): Promise<void> => {
		try {
			const { name, checked } = event.target;
			await updateTodo(+id, {
				[name]: checked,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (): Promise<void> => {
		try {
			await deleteTodo(+id);
		} catch (error) {
			console.log(error);
		}
	};

	const toggleModal = (): void => {
		setShow(!show);
	};

	return (
		<>
			<Card
				interactive={true}
				elevation={Elevation.TWO}
				className={todoCard}
			>
				<div className={todoTextContainer}>
					<h2 className={todoTitle}>{title}</h2>
					<p className={todoDescr}>
						{description.length > 200
							? `${description.substring(0, 200)}...`
							: description}
					</p>
				</div>
				<div className={todoWrapper}>
					<Link to={`/${id}`} className={todoViewLink}>
						View
					</Link>

					{todo.userId === user.id && (
						<>
							<div className={todoBtnContainer}>
								<Button
									type="button"
									icon={<Icon icon="edit" size={20} />}
									onClick={toggleModal}
								/>

								<Button
									type="button"
									onClick={handleDelete}
									icon={<Icon icon="trash" size={20} />}
								/>
							</div>

							<Switch
								name="isCompleted"
								large={true}
								checked={isCompleted}
								onChange={handleSwitchChange}
							/>
						</>
					)}
				</div>
			</Card>
			<Modal setShow={setShow} show={show}>
				<TodoForm todo={todoForForm} onSubmitHandler={handleEdit} />
			</Modal>
		</>
	);
};

export default TodoCard;
