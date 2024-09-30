import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '~shared/components/header/header.component';

const Todos = React.lazy(() => import('../todos/todos-page.component'));
const Todo = React.lazy(() => import('../todo/todo-page.component'));
const Signup = React.lazy(() => import('../auth/signup/signup.component'));
const Login = React.lazy(() => import('../auth/login/login.component'));
const ForgetPassword = React.lazy(
	() => import('../auth/forget-password/forget-password.component'),
);
const ResetPassword = React.lazy(
	() => import('../auth/reset-password/reset-password.component'),
);
const ChangePassword = React.lazy(
	() => import('../auth/change-password/change-password-component'),
);
const ResendEmailVerification = React.lazy(
	() =>
		import(
			'../auth/resend-verify-email/resend-email-verification.component'
		),
);
const ConfirmEmailVerification = React.lazy(
	() => import('../auth/confirm-email/confirm-email-verification.component'),
);

const App = (): React.ReactNode => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Todos />} />
				<Route path="/:id" element={<Todo />} />
				<Route path="/register" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forget-password" element={<ForgetPassword />} />
				<Route
					path="/reset-password/:userId/:verificationCode"
					element={<ResetPassword />}
				/>
				<Route path="/change-password" element={<ChangePassword />} />
				<Route
					path="/verify/:userId/:verificationCode"
					element={<ConfirmEmailVerification />}
				/>
				<Route path="/verify" element={<ResendEmailVerification />} />

				<Route path="*" element={<Todos />} />
			</Route>
		</Routes>
	);
};

export default App;
