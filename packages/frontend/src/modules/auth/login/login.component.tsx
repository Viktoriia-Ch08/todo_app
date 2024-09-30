import { isString, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '~/yup-schema/auth/login-schema';
import Button from '~shared/components/button/button.component';
import Input from '~shared/components/input/input.component';
import { failedNotification } from '~shared/notifications/notification-failed';
import { successfulNotification } from '~shared/notifications/notification-success';
import { useAuthStore } from '~store/auth.store';
import { formWrap, linkEl } from '~modules/auth/auth.styles';
import { ROUTER_KEYS } from '~shared/keys/routes-key';
import { loginInit } from '~shared/form-init-values/auth-form-init-values';

const Login: React.FC = () => {
	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	const handleSubmit = async (values, { resetForm }): Promise<void> => {
		try {
			await login(values);
			resetForm();
			navigate(ROUTER_KEYS.ALL_TODOS);
			successfulNotification('You are logged in!');
		} catch (error) {
			failedNotification(`You did not login: ${error}`);
		}
	};
	const formik = useFormik({
		initialValues: loginInit,
		validationSchema: loginValidationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<section>
			<div className={`${formWrap} main-container`}>
				<form onSubmit={formik.handleSubmit}>
					<Input
						text="Email"
						name="email"
						type="email"
						value={formik.values.email}
						placeholder="edward@gmail.com"
						onChange={formik.handleChange}
						error={
							isString(formik.errors.email) && formik.errors.email
						}
					/>
					<Input
						text="Password"
						name="password"
						type="password"
						placeholder="Write your password"
						onChange={formik.handleChange}
						error={
							isString(formik.errors.password) &&
							formik.errors.password
						}
						value={formik.values.password}
					/>
					<div>
						<Button
							type="submit"
							text="Submit"
							extraButtonStyles="text-align: center"
						/>
					</div>
				</form>
				<Link to={ROUTER_KEYS.REGISTER} className={linkEl}>
					Signup
				</Link>
				<Link to={ROUTER_KEYS.FORGET_PASSWORD} className={linkEl}>
					Forget password
				</Link>
			</div>
		</section>
	);
};

export default Login;
