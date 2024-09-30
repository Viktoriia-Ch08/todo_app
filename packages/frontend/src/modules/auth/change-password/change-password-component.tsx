import { isString, useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { changePasswordValidationSchema } from '~/yup-schema/auth/password/change-password-schema';
import Button from '~shared/components/button/button.component';
import Input from '~shared/components/input/input.component';
import { failedNotification } from '~shared/notifications/notification-failed';
import { successfulNotification } from '~shared/notifications/notification-success';
import { useAuthStore } from '~store/auth.store';
import { changePasswordWrap } from './change-password.styles';
import { ROUTER_KEYS } from '~shared/keys/routes-key';
import { changePasswordInit } from '~shared/form-init-values/auth-form-init-values';

const ChangePassword: React.FC = () => {
	const changePassword = useAuthStore((state) => state.changePassword);
	const navigate = useNavigate();

	const handleSubmit = async (values, resetForm): Promise<void> => {
		try {
			await changePassword(values);
			resetForm();
			navigate(ROUTER_KEYS.ALL_TODOS);
			successfulNotification('You have changed your password!');
		} catch (error) {
			failedNotification(`Smth went wrong: ${error}`);
		}
	};

	const formik = useFormik({
		initialValues: changePasswordInit,
		validationSchema: changePasswordValidationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<section>
			<div className={`${changePasswordWrap} main-container`}>
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
						value={formik.values.password}
						onChange={formik.handleChange}
						error={
							isString(formik.errors.password) &&
							formik.errors.password
						}
					/>
					<Input
						text="New password"
						name="newPassword"
						type="password"
						value={formik.values.newPassword}
						onChange={formik.handleChange}
						error={
							isString(formik.errors.newPassword) &&
							formik.errors.newPassword
						}
					/>
					<div>
						<Button
							type="submit"
							text="Change password"
							extraButtonStyles="text-align: center"
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ChangePassword;
