import * as Yup from 'yup';

export const emailVerificationValidationSchema = Yup.object().shape({
	email: Yup.string().required('Email is required'),
});
