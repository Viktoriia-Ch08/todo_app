import { isString, useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~shared/components/button/button.component';
import Input from '~shared/components/input/input.component';
import { failedNotification } from '~shared/notifications/notification-failed';
import { successfulNotification } from '~shared/notifications/notification-success';
import { useAuthStore } from '~store/auth.store';
import { profileValidationSchema } from '~yup-schema/user/profile-schema';
import {
	changePasswordWrap,
	profileHeader,
	profileText,
	profileTitle,
	profileWrapper,
	textWrap,
	updateUsernameWrap,
} from './profile.styled';
import { Icon } from '@blueprintjs/core';
import { ROUTER_KEYS } from '~shared/keys/routes-key';

const Profile: React.FC = () => {
	const user = useAuthStore((state) => state.user);
	const updateProfile = useAuthStore((state) => state.updateProfile);
	const navigate = useNavigate();
	const [isEdit, setIsEdit] = useState(false);
	const profileInit = {
		username: user.username,
	};

	const handleSubmit = async (values, resetForm): Promise<void> => {
		try {
			await updateProfile(values);
			resetForm();
			navigate(ROUTER_KEYS.ALL_TODOS);
			successfulNotification('You have updated your name!');
		} catch (error) {
			failedNotification(`Smth went wrong: ${error}`);
		}
	};

	const formik = useFormik({
		initialValues: profileInit,
		validationSchema: profileValidationSchema,
		onSubmit: handleSubmit,
	});

	const toggleEdit = (): void => setIsEdit(!isEdit);

	return (
		<section className="main-container">
			<div className={profileWrapper}>
				<h2 className={profileHeader}>Profile</h2>
				<div className={textWrap}>
					{isEdit ? (
						<>
							<form onSubmit={formik.handleSubmit}>
								<Input
									text="Username"
									name="username"
									type="text"
									value={formik.values.username || ''}
									placeholder="Adam"
									onChange={formik.handleChange}
									error={
										isString(formik.errors.username) &&
										formik.errors.username
									}
								/>
								<div>
									<Button
										type="submit"
										text="Update"
										extraButtonStyles="text-align: center"
									/>
								</div>
							</form>
						</>
					) : (
						<div className={updateUsernameWrap}>
							<p className={profileTitle}>
								Username: <span>{user.username}</span>
							</p>

							<div>
								<Button
									type="button"
									onClick={toggleEdit}
									extraButtonStyles="text-align: center;"
									icon={<Icon icon="edit" size={20} />}
								/>
							</div>
						</div>
					)}
					<p className={profileTitle}>
						Email: <span>{user.email}</span>
					</p>
				</div>
				<p className={profileText}>
					Do you want to change your password? Click on the button
					below!
				</p>
				<div className={changePasswordWrap}>
					<Button
						text="Change password"
						onClick={() => navigate(ROUTER_KEYS.CHANGE_PASSWORD)}
						extraButtonStyles="width: 300px"
					/>
				</div>
			</div>
		</section>
	);
};

export default Profile;
