import * as Yup from 'yup';

export const searchSchema = Yup.object().shape({
	search: Yup.string().max(200),
});
