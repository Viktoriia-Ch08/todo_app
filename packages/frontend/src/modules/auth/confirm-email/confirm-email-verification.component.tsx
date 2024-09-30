import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys/routes-key';
import { successfulNotification } from '~shared/notifications/notification-success';
import { useAuthStore } from '~store/auth.store';

const ConfirmEmailVerification: React.FC = () => {
	const confirmEmailVerification = useAuthStore(
		(state) => state.confirmEmailVerification,
	);
	const navigate = useNavigate();
	const { userId, verificationCode } = useParams();

	useEffect(() => {
		confirmEmailVerification(userId, verificationCode);
		successfulNotification('You confirmed your email successfully!');
		navigate(ROUTER_KEYS.ALL_TODOS);
	}, [userId, verificationCode]);

	return <></>;
};

export default ConfirmEmailVerification;
