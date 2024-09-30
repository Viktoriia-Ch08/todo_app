import * as Yup from 'yup';

export const changePasswordValidationSchema = Yup.object().shape({
	email: Yup.string().required('Email is required'),
	password: Yup.string().min(5).required('Password is required'),
	newPassword: Yup.string().min(5).required('New password is required'),
});
