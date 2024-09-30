import TodosSearch from './components/todos-search/todos-search.component';
import TodosStatus from './components/todos-status/todos-status.component';
import { todosFilterWrap } from './todos-filter.styles';

const TodosFilters: React.FC = () => {
	return (
		<div className={`${todosFilterWrap} main-container`}>
			<TodosSearch />
			<TodosStatus />
		</div>
	);
};

export default TodosFilters;
