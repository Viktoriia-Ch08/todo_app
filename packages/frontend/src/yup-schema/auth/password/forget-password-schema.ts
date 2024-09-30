import * as Yup from 'yup';

export const forgetPasswordValidationSchema = Yup.object().shape({
	email: Yup.string().required('Email is required'),
});
