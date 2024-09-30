enum ApiResources {
	TODOS = 'todos',
	USER = 'user',
}

export const ApiTodoEndpoints = {
	ALL: `${ApiResources.TODOS}/all`,
	CREATE: `${ApiResources.TODOS}/`,
	TODOS_ID: (id: number) => `${ApiResources.TODOS}/${id}`,
} as const;

export const ApiAuthEndpoints = {
	REGISTER: `${ApiResources.USER}/register`,
	LOGIN: `${ApiResources.USER}/login`,
	FORGET_PASSWORD: `${ApiResources.USER}/forget-password`,
	CHANGE_PASSWORD: `${ApiResources.USER}/change-password`,
	RESET_PASSWORD: (userId: string, verificationCode: string) =>
		`${ApiResources.USER}/reset-password/${userId}/${verificationCode}`,
	CONFIRM_EMAIL_VERIFICATION: (userId: string, verificationCode: string) =>
		`${ApiResources.USER}/verify/${userId}/${verificationCode}`,
	RESEND_EMAIL_VERIFICATION: `${ApiResources.USER}/verify`,
	CURRENT_USER: `${ApiResources.USER}/current-user`,
	UPDATE_PROFILE: `${ApiResources.USER}/update-user`,
} as const;

export const STORAGE_KEYS = Object.freeze({
	TOKEN: 'TOKEN',
});
