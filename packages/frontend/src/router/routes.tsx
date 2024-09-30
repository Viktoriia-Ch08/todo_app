import React from 'react';
import { Route } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys/routes-key';

const Todos = React.lazy(() => import('../modules/todos/todos-page.component'));
const Todo = React.lazy(() => import('../modules/todo/todo-page.component'));
const Signup = React.lazy(
	() => import('../modules/auth/signup/signup.component'),
);
const Login = React.lazy(() => import('../modules/auth/login/login.component'));
const ForgetPassword = React.lazy(
	() => import('../modules/auth/forget-password/forget-password.component'),
);
const ResetPassword = React.lazy(
	() => import('../modules/auth/reset-password/reset-password.component'),
);
const ChangePassword = React.lazy(
	() => import('../modules/auth/change-password/change-password-component'),
);
const ResendEmailVerification = React.lazy(
	() =>
		import(
			'../modules/auth/resend-verify-email/resend-email-verification.component'
		),
);
const ConfirmEmailVerification = React.lazy(
	() =>
		import(
			'../modules/auth/confirm-email/confirm-email-verification.component'
		),
);

const Profile = React.lazy(
	() => import('../modules/profile/profile.component'),
);

export const publicRoutes = (): JSX.Element => {
	return (
		<>
			<Route path={ROUTER_KEYS.REGISTER} element={<Signup />} />
			,
			<Route
				path={ROUTER_KEYS.CONFIRM_EMAIL}
				element={<ConfirmEmailVerification />}
			/>
			,
			<Route path={ROUTER_KEYS.LOGIN} element={<Login />} />
			,
			<Route
				path={ROUTER_KEYS.FORGET_PASSWORD}
				element={<ForgetPassword />}
			/>
			,
			<Route
				path={ROUTER_KEYS.RESET_PASSWORD}
				element={<ResetPassword />}
			/>
			,
			<Route
				path={ROUTER_KEYS.RESEND_EMAIL_CONFIRM}
				element={<ResendEmailVerification />}
			/>
			,
		</>
	);
};

export const privateRoutes = (): JSX.Element => {
	return (
		<>
			<Route path={ROUTER_KEYS.ALL_TODOS} element={<Todos />} />,
			<Route path={ROUTER_KEYS.TODO_BY_ID} element={<Todo />} />, ,
			<Route
				path={ROUTER_KEYS.CHANGE_PASSWORD}
				element={<ChangePassword />}
			/>
			<Route path={ROUTER_KEYS.PROFILE} element={<Profile />} />
		</>
	);
};
