import { Carousel } from 'react-responsive-carousel';
import React from 'react';
import TodoCard from '~shared/components/card/card.component';
import { carousel } from './todo-tablet-container.styles';
import { TodosDataType } from '~shared/types/todo-types';
import { TODOS_NUMBER_PER_PAGE } from '~shared/constants/todos-config';
import { notFoundTodosText } from '~modules/todos/todos-page.styles';

type TabletContainerProps = {
	todosData: TodosDataType;
	incrementPage: () => void;
	isLastPage: boolean;
};

const TabletContainer: React.FC<TabletContainerProps> = ({
	todosData,
	incrementPage,
	isLastPage,
}) => {
	function handleSlideChange(index: number): void {
		if ((index + 1) % TODOS_NUMBER_PER_PAGE === 0 && !isLastPage) {
			incrementPage();
		}
	}

	return (
		<>
			{todosData && todosData.todos.length > 0 ? (
				<Carousel
					showThumbs={false}
					onChange={handleSlideChange}
					className={carousel}
				>
					{todosData.todos.map((todo) => {
						return (
							<TodoCard
								todo={todo}
								key={`${todo.id}${todo.title}`}
							/>
						);
					})}
				</Carousel>
			) : (
				<p className={notFoundTodosText}>You don't have any todos</p>
			)}
		</>
	);
};

export default TabletContainer;
