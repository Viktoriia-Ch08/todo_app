import { isString, useFormik } from 'formik';
import Input from '../../../../../../shared/components/input/input.component';
import Button from '../../../../../../shared/components/button/button.component';
import { searchSchema } from '~yup-schema/filters/search-schema';
import { useTodoStore } from '~store/todos.store';
import { Icon } from '@blueprintjs/core';
import { todosSearchForm } from './todos-search.styles';

const TodosSearch: React.FC = () => {
	const query = useTodoStore((state) => state.query);
	const setQuery = useTodoStore((state) => state.setQuery);
	const searchInit = { search: query?.search || '' };

	const handleSubmit = ({ search }): void => {
		setQuery({ ...query, ...(search ? { search } : { search: null }) });
	};

	const formik = useFormik({
		initialValues: searchInit,
		validationSchema: searchSchema,
		onSubmit: handleSubmit,
	});

	return (
		<form onSubmit={formik.handleSubmit} className={todosSearchForm}>
			<Input
				name="search"
				type="text"
				placeholder="Search..."
				onChange={formik.handleChange}
				value={formik.values.search}
				error={isString(formik.errors.search) && formik.errors.search}
			/>

			<div>
				<Button
					type="submit"
					extraButtonStyles="text-align: center"
					icon={<Icon icon="search" size={20} />}
				/>
			</div>
		</form>
	);
};

export default TodosSearch;
