import {
	Alignment,
	Icon,
	Navbar,
	NavbarDivider,
	NavbarGroup,
} from '@blueprintjs/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '~shared/styles';
import Modal from '../modal/modal.component';
import TodoForm from '../../../modules/todos/components/todo-form/todo-form.component';
import { useTodoStore } from '~store/todos.store';
import { TodoType } from '~shared/types/todo-types';
import { useAuthStore } from '~store/auth.store';
import Button from '../button/button.component';
import { header, loginLink, logoutWrapper, navbar } from './header.styles';
import { ROUTER_KEYS } from '~shared/keys/routes-key';

const Header: React.FunctionComponent = () => {
	const [show, setShow] = useState(false);
	const addTodo = useTodoStore((state) => state.addTodo);
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const handleCreate = async (todo: TodoType): Promise<void> => {
		try {
			await addTodo(todo);
			setShow(false);
		} catch (error) {
			console.log(error);
		}
	};

	const toggleModal = (): void => {
		setShow(!show);
	};

	const logOut = (): void => logout();

	return (
		<>
			<header className={header}>
				<Navbar className={navbar}>
					<NavbarGroup align={Alignment.LEFT}>
						<Link to={ROUTER_KEYS.ALL_TODOS}>
							<Icon
								icon="home"
								size={35}
								color={colors.jacarta}
							/>
						</Link>
						<NavbarDivider />
						{user && (
							<>
								<button type="button" onClick={toggleModal}>
									<Icon
										icon="add"
										size={35}
										color={colors.jacarta}
									/>
								</button>
								<NavbarDivider />
								<Link to={ROUTER_KEYS.PROFILE}>
									<Icon
										icon="user"
										size={35}
										color={colors.jacarta}
									/>
								</Link>
							</>
						)}
						{!user && (
							<Link to={ROUTER_KEYS.LOGIN} className={loginLink}>
								Login
							</Link>
						)}
					</NavbarGroup>
					{user && (
						<div className={logoutWrapper}>
							<Button
								onClick={logOut}
								icon={<Icon icon="log-out" size={15} />}
							/>
						</div>
					)}
				</Navbar>
			</header>

			<Modal setShow={setShow} show={show}>
				<TodoForm onSubmitHandler={handleCreate} />
			</Modal>
		</>
	);
};

export default Header;
