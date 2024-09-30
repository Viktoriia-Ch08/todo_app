import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
	username: Yup.string().required('Username is required'),
});
