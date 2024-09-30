export type StoredUserType = {
	id: number;
	email: string;
	username: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type SignupUserType = {
	email: string;
	username: string;
	password: string;
};

export type LoginUserType = {
	email: string;
	password: string;
};

export type ResetPasswordType = {
	newPassword: string;
};

export type ForgetPasswordType = {
	email: string;
};

export type ForgetPasswordResponseType = {
	message: string;
};

export type ChangePasswordType = {
	email: string;
	password: string;
	newPassword: string;
};
export type ResendEmailVerificationType = {
	email: string;
};

export type ResendEmailVerificationResponseType = {
	message: string;
};

export type UpdateProfileType = {
	username: string;
};
