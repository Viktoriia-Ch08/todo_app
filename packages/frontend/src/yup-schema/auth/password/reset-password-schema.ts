import * as Yup from 'yup';

export const resetPasswordValidationSchema = Yup.object().shape({
	newPassword: Yup.string().min(5).required('Password is required'),
});
