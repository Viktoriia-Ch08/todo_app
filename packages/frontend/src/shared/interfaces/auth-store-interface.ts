import {
	ChangePasswordType,
	ForgetPasswordType,
	LoginUserType,
	ResendEmailVerificationType,
	ResetPasswordType,
	SignupUserType,
	StoredUserType,
	UpdateProfileType,
} from '~shared/types/auth-types';

export interface IAuthStore {
	user: StoredUserType;
	fetching: boolean;
	signup: (user: SignupUserType) => Promise<void>;
	login: (user: LoginUserType) => Promise<void>;
	forgetPassword: (data: ForgetPasswordType) => Promise<void>;
	resetPassword: (
		userId: string,
		verificationCode: string,
		data: ResetPasswordType,
	) => Promise<void>;
	changePassword: (data: ChangePasswordType) => Promise<void>;
	confirmEmailVerification: (
		userId: string,
		verificationCode: string,
	) => Promise<void>;
	resendEmailVerification: (
		data: ResendEmailVerificationType,
	) => Promise<void>;
	authByToken(): Promise<void>;
	updateProfile: (data: UpdateProfileType) => Promise<void>;
	logout: () => void;
}
