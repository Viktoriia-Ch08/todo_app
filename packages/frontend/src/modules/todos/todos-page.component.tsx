import { useTodoStore } from '~store/todos.store';
import TodoList from './components/todo-list/todo-list.component';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import TabletContainer from './components/todo-tablet-container/todo-tablet-container';
import TodoDesktopContainer from './components/todo-desktop-container/todo-desktop-container';
import TodosFilters from './components/todo-filters/todos-filters.component';
import { useSearchParams } from 'react-router-dom';
import {
	convertToBoolean,
	convertToSearchParams,
} from '~shared/helpers/types-converter';
import { TodosQueryType } from '~shared/types/todo-types';
import { TODOS_NUMBER_PER_PAGE } from '~shared/constants/todos-config';

const Todos: React.FunctionComponent = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const fetchTodos = useTodoStore((state) => state.fetchTodos);
	const fetchAndAppendTodos = useTodoStore(
		(state) => state.fetchAndAppendTodos,
	);
	const clearTodos = useTodoStore((state) => state.clearTodos);
	const setQuery = useTodoStore((state) => state.setQuery);
	const query = useTodoStore((state) => state.query);

	const todosData = useTodoStore((state) => state.todosData);

	const previousQurey = useRef<TodosQueryType>();

	const isDesktop = useMediaQuery({
		query: '(min-width: 1224px)',
	});
	const isTablet = useMediaQuery({
		query: '(max-width: 1223px) and (min-width: 768px)',
	});
	const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

	const hasFilterChanged = (query: TodosQueryType): boolean => {
		return (
			query.isCompleted !== previousQurey.current?.isCompleted ||
			query.isPrivate !== previousQurey.current?.isPrivate ||
			query.search !== previousQurey.current?.search
		);
	};

	useEffect(() => {
		const search = searchParams.get('search');
		const isPrivate = convertToBoolean(searchParams.get('isPrivate'));
		const isCompleted = convertToBoolean(searchParams.get('isCompleted'));
		setQuery({
			search,
			isPrivate,
			isCompleted,
			limit: TODOS_NUMBER_PER_PAGE,
		});
	}, []);

	useEffect(() => {
		if (!query) {
			return;
		}

		if (hasFilterChanged(query)) {
			clearTodos();
			const newQuery = { ...query, page: 1 };
			previousQurey.current = newQuery;
			setQuery(newQuery);
			return;
		}

		previousQurey.current = query;
		setSearchParams(
			convertToSearchParams({
				isCompleted: query.isCompleted,
				isPrivate: query.isPrivate,
				search: query.search,
			}),
		);

		if (!isDesktop) {
			fetchAndAppendTodos(query);
		} else {
			fetchTodos(query);
		}
	}, [query]);

	const isLastPage = (): boolean => {
		return query.page >= todosData?.totalPages;
	};

	const incrementPage = (): void => {
		if (isLastPage()) return;
		setQuery({ ...query, page: query.page + 1 });
	};

	const decrementPage = (): void => {
		setQuery({ ...query, page: query.page - 1 });
	};

	return (
		<section>
			{query && (
				<>
					<TodosFilters />
					{isMobile && (
						<div id="scrollableDiv" style={{ height: '80vh' }}>
							<TodoList
								todosData={todosData}
								incrementPage={incrementPage}
							/>
						</div>
					)}
					{isTablet && (
						<TabletContainer
							todosData={todosData}
							incrementPage={incrementPage}
							isLastPage={isLastPage()}
						/>
					)}
					{isDesktop && (
						<TodoDesktopContainer
							todosData={todosData}
							incrementPage={incrementPage}
							decrementPage={decrementPage}
							isLastPage={isLastPage()}
							page={query.page}
						/>
					)}
				</>
			)}
		</section>
	);
};

export default Todos;
