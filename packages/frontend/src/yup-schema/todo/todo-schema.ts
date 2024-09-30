import * as Yup from 'yup';

export const todoValidationSchema = Yup.object().shape({
	title: Yup.string().min(1).max(200).required('Title is required'),
	description: Yup.string().required('Description is required'),
	isCompleted: Yup.boolean(),
	isPrivate: Yup.boolean(),
});
