import { isString, useFormik } from 'formik';
import Input from '../../../../shared/components/input/input.component';
import { todoValidationSchema } from '../../../../yup-schema/todo/todo-schema';
import {
	todoForm,
	todoFormSubmitWrapper,
	todoFormWrapper,
} from './todo-form.styles';
import Button from '../../../../shared/components/button/button.component';
import Textarea from '../../../../shared/components/textarea/textarea.component';
import Checkbox from '../../../../shared/components/checkbox/checkbox.component';
import { TodoType } from '~shared/types/todo-types';
import { getInitValue } from '~shared/form-init-values/todo-form-init-values';

type TodoFormPropsType = {
	todo?: TodoType | undefined;
	onSubmitHandler: (todo: TodoType) => Promise<void>;
};

const TodoForm: React.FC<TodoFormPropsType> = ({ todo, onSubmitHandler }) => {
	const todoInit = getInitValue(todo);

	const handleSubmit = (values): Promise<void> => onSubmitHandler(values);

	const formik = useFormik({
		initialValues: todoInit,
		validationSchema: todoValidationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<div className={todoFormWrapper}>
			<form onSubmit={formik.handleSubmit} className={todoForm}>
				<Input
					text="Title"
					name="title"
					type="text"
					placeholder="Write todo's title"
					onChange={formik.handleChange}
					value={formik.values.title}
					error={isString(formik.errors.title) && formik.errors.title}
				/>
				<Textarea
					text="Description"
					name="description"
					placeholder="Write todo's description"
					onChange={formik.handleChange}
					value={formik.values.description}
					error={
						isString(formik.errors.description) &&
						formik.errors.description
					}
				/>
				<Checkbox
					text="Private"
					name="isPrivate"
					type="checkbox"
					onChange={formik.handleChange}
					checked={formik.values.isPrivate}
				/>
				<Checkbox
					text="Completed"
					name="isCompleted"
					type="checkbox"
					onChange={formik.handleChange}
					checked={formik.values.isCompleted}
				/>
				<div className={todoFormSubmitWrapper}>
					<Button
						type="submit"
						text="Submit"
						extraButtonStyles="text-align: center"
					/>
				</div>
			</form>
		</div>
	);
};

export default TodoForm;
