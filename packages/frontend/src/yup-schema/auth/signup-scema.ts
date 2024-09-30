import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
	username: Yup.string().min(1).max(30).required('Username is required'),
	email: Yup.string().required('Email is required'),
	password: Yup.string().min(5).required('Password is required'),
});
