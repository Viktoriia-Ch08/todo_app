import { useTodoStore } from '~store/todos.store';
import { TodosQueryType } from '~shared/types/todo-types';
import { statusBtn, statusBtnWrapper } from './todos-status.styles';
import { FILTER_BTN_KEYS } from '~shared/keys/filter-buttons-keys';

const TodosStatus: React.FC = () => {
	const query = useTodoStore((state) => state.query);
	const setQuery = useTodoStore((state) => state.setQuery);

	const handleClick = (newQuery: TodosQueryType): void => {
		setQuery({ ...query, ...newQuery });
	};

	const isActive = (newQuery: TodosQueryType): boolean => {
		return Object.keys(newQuery).every(
			(key) => query[key] === newQuery[key],
		);
	};

	const renderButton = (
		query: TodosQueryType,
		label: string,
	): JSX.Element => {
		return (
			<button
				className={`${statusBtn} ${isActive(query) ? 'active' : ''}`}
				type="button"
				onClick={() => handleClick(query)}
				name={label.toLowerCase()}
			>
				{label}
			</button>
		);
	};

	return (
		<div className={statusBtnWrapper}>
			{renderButton(
				{ isPrivate: undefined, isCompleted: undefined },
				FILTER_BTN_KEYS.ALL,
			)}
			{renderButton(
				{ isPrivate: true, isCompleted: undefined },
				FILTER_BTN_KEYS.PRIVATE,
			)}
			{renderButton(
				{ isPrivate: false, isCompleted: undefined },
				FILTER_BTN_KEYS.PUBLIC,
			)}
			{renderButton(
				{ isCompleted: true, isPrivate: undefined },
				FILTER_BTN_KEYS.COMPLETED,
			)}
		</div>
	);
};

export default TodosStatus;
