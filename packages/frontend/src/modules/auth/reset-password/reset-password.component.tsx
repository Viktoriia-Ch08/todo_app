import { isString, useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordValidationSchema } from '~/yup-schema/auth/password/reset-password-schema';
import Button from '~shared/components/button/button.component';
import Input from '~shared/components/input/input.component';
import { failedNotification } from '~shared/notifications/notification-failed';
import { successfulNotification } from '~shared/notifications/notification-success';
import { useAuthStore } from '~store/auth.store';
import { formWrap } from '../auth.styles';
import { ROUTER_KEYS } from '~shared/keys/routes-key';
import { resetPasswordInit } from '~shared/form-init-values/auth-form-init-values';

const ResetPassword: React.FC = () => {
	const resetPassword = useAuthStore((state) => state.resetPassword);
	const navigate = useNavigate();
	const { userId, verificationCode } = useParams();

	const handleSubmit = async (values, resetForm): Promise<void> => {
		try {
			await resetPassword(userId, verificationCode, values);
			resetForm();
			navigate(ROUTER_KEYS.ALL_TODOS);
			successfulNotification('You have updated your password');
		} catch (error) {
			failedNotification(`Smth went wrong: ${error}`);
		}
	};

	const formik = useFormik({
		initialValues: resetPasswordInit,
		validationSchema: resetPasswordValidationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<section>
			<div className={`${formWrap} main-container`}>
				<form onSubmit={formik.handleSubmit}>
					<Input
						text="New Password"
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
							text="Reset password"
							extraButtonStyles="text-align: center"
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ResetPassword;
