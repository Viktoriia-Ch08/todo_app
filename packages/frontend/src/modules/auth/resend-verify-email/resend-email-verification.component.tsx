import { isString, useFormik } from 'formik';
import React from 'react';
import { emailVerificationValidationSchema } from '~/yup-schema/auth/verify-email-schema';
import Button from '~shared/components/button/button.component';
import Input from '~shared/components/input/input.component';
import { failedNotification } from '~shared/notifications/notification-failed';
import { successfulNotification } from '~shared/notifications/notification-success';
import { useAuthStore } from '~store/auth.store';
import { form, formWrap, submitBtn } from '../auth.styles';
import { resendEmailInit } from '~shared/form-init-values/auth-form-init-values';

const ResendEmailVerification: React.FC = () => {
	const resendEmailVerification = useAuthStore(
		(state) => state.resendEmailVerification,
	);
	const handleSubmit = async (values, { resetForm }): Promise<void> => {
		try {
			await resendEmailVerification(values);
			resetForm();
			successfulNotification('Check your email!');
		} catch (error) {
			failedNotification(`Smth went wrong: ${error}`);
		}
	};

	const formik = useFormik({
		initialValues: resendEmailInit,
		validationSchema: emailVerificationValidationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<section>
			<div className={`${formWrap} main-container`}>
				<form onSubmit={formik.handleSubmit} className={form}>
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
					<div className={submitBtn}>
						<Button
							type="submit"
							text="Send"
							extraButtonStyles="text-align: center"
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ResendEmailVerification;
