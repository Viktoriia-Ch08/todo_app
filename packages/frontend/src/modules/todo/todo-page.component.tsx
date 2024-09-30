import { ChangeEventHandler, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoStore } from '~store/todos.store';
import {
	todoBackBtnWrapper,
	todoBtnsWrapper,
	todoSwitchWrapper,
	todoTitle,
	todoWrapper,
} from './todo-page.styled';
import { Switch } from '@blueprintjs/core';
import Button from '~shared/components/button/button.component';
import Modal from '~shared/components/modal/modal.component';
import TodoForm from '~modules/todos/components/todo-form/todo-form.component';
import { TodoUpdateType } from '~shared/types/todo-types';
import { useAuthStore } from '~store/auth.store';

const Todo: React.FunctionComponent = () => {
	const { id } = useParams();
	const fetchTodoById = useTodoStore((state) => state.fetchTodoById);
	const deleteTodo = useTodoStore((state) => state.deleteTodoById);
	const updateTodo = useTodoStore((state) => state.updateTodoById);
	const todoDetails = useTodoStore((state) => state.todoDetails);
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	useEffect(() => {
		fetchTodoById(+id);
	}, [id]);

	const handleEdit = async (todo: Partial<TodoUpdateType>): Promise<void> => {
		try {
			await updateTodo(+todoDetails.id, todo);
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
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const toggleModal = (): void => {
		setShow(!show);
	};

	return (
		<section className="main-container">
			<div className={todoBackBtnWrapper}>
				<Button
					text="Back"
					type="button"
					onClick={() => navigate(-1)}
				/>
			</div>
			{todoDetails !== null && (
				<div className={todoWrapper}>
					<h2 className={todoTitle}>{todoDetails.title}</h2>
					<p>{todoDetails.description}</p>
					{todoDetails.userId === user.id && (
						<>
							<div className={todoSwitchWrapper}>
								Private
								<Switch
									name="isPrivate"
									large={true}
									checked={todoDetails.isPrivate}
									onChange={handleSwitchChange}
								/>
							</div>
							<div className={todoSwitchWrapper}>
								Completed
								<Switch
									name="isCompleted"
									large={true}
									checked={todoDetails.isCompleted}
									onChange={handleSwitchChange}
								/>
							</div>
							<div className={todoBtnsWrapper}>
								<Button
									type="button"
									text="Edit"
									onClick={toggleModal}
								/>
								<Button
									type="button"
									onClick={handleDelete}
									text="Delete"
								/>
							</div>
						</>
					)}
				</div>
			)}
			<Modal setShow={setShow} show={show}>
				<TodoForm todo={todoDetails} onSubmitHandler={handleEdit} />
			</Modal>
		</section>
	);
};

export default Todo;
