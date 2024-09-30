import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
	email: Yup.string().required('Email is required'),
	password: Yup.string().min(5).required('Password is required'),
});
