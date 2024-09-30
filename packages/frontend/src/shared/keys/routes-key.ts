export const BASE_NAME = {
	TODOS: '/todos/',
};

export const enum ROUTER_KEYS {
	OPTIONAL = '/',
	ALL_TODOS = '/all',
	TODO_BY_ID = '/:id',
	REGISTER = '/register',
	LOGIN = '/login',
	FORGET_PASSWORD = '/forget-password',
	RESET_PASSWORD = '/reset-password/:userId/:verificationCode',
	CHANGE_PASSWORD = '/change-password',
	CONFIRM_EMAIL = '/verify/:userId/:verificationCode',
	RESEND_EMAIL_CONFIRM = '/verify',
	ALL_MATCH = '/*',
	PROFILE = '/profile',
}
