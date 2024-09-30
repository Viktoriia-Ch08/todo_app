import { isString, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { signupValidationSchema } from '~/yup-schema/auth/signup-scema';
import Button from '~shared/components/button/button.component';
import Input from '~shared/components/input/input.component';
import { failedNotification } from '~shared/notifications/notification-failed';
import { successfulNotification } from '~shared/notifications/notification-success';
import { useAuthStore } from '~store/auth.store';
import { resendVerificationWrap } from './signup.styles';
import { formWrap, linkEl } from '../auth.styles';
import { signupInit } from '~shared/form-init-values/auth-form-init-values';
import { ROUTER_KEYS } from '~shared/keys/routes-key';

const Signup: React.FC = () => {
	const signup = useAuthStore((state) => state.signup);

	const handleSubmit = async (values, { resetForm }): Promise<void> => {
		try {
			await signup(values);
			resetForm();
			successfulNotification(
				'You should complete register! Check your email, please.',
			);
		} catch (error) {
			failedNotification(`You did not register: ${error}`);
		}
	};

	const formik = useFormik({
		initialValues: signupInit,
		validationSchema: signupValidationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<section>
			<div className={`${formWrap} main-container`}>
				<form onSubmit={formik.handleSubmit}>
					<Input
						text="Username"
						name="username"
						type="text"
						value={formik.values.username}
						placeholder="Edward"
						onChange={formik.handleChange}
						error={
							isString(formik.errors.username) &&
							formik.errors.username
						}
					/>
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
						value={formik.values.password}
						error={
							isString(formik.errors.password) &&
							formik.errors.password
						}
					/>
					<div>
						<Button
							type="submit"
							text="Submit"
							extraButtonStyles="text-align: center"
						/>
					</div>
				</form>
				<Link to={ROUTER_KEYS.LOGIN} className={linkEl}>
					Login
				</Link>
				<div className={resendVerificationWrap}>
					<p>
						Don't get verification message on email? Resend message
						one more time:
					</p>
					<Link
						to={ROUTER_KEYS.RESEND_EMAIL_CONFIRM}
						className={linkEl}
					>
						Resend verification code
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Signup;
