import {
	ChangePasswordType,
	ForgetPasswordResponseType,
	ForgetPasswordType,
	LoginUserType,
	ResetPasswordType,
	SignupUserType,
	StoredUserType,
	ResendEmailVerificationResponseType,
	ResendEmailVerificationType,
	UpdateProfileType,
} from '~shared/types/auth-types';
import { HttpSerivce } from './http-service';
import { ApiAuthEndpoints, STORAGE_KEYS } from '~shared/keys/api-keys';

type RegisteredUserType = {
	user: StoredUserType;
	token: string;
};
class AuthService extends HttpSerivce {
	constructor() {
		super();
	}

	async signup(data: SignupUserType): Promise<RegisteredUserType> {
		const response = await this.post<SignupUserType, RegisteredUserType>(
			{
				url: ApiAuthEndpoints.REGISTER,
				data,
			},
			false,
		);
		localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);

		return response.data;
	}

	async login(data: LoginUserType): Promise<RegisteredUserType> {
		const response = await this.post<LoginUserType, RegisteredUserType>({
			url: ApiAuthEndpoints.LOGIN,
			data,
		});

		localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);

		return response.data;
	}

	async forgetPassword(
		data: ForgetPasswordType,
	): Promise<ForgetPasswordResponseType> {
		const response = await this.post<
			ForgetPasswordType,
			ForgetPasswordResponseType
		>(
			{
				url: ApiAuthEndpoints.FORGET_PASSWORD,
				data,
			},
			false,
		);

		return response.data;
	}

	async resetPassword(
		userId: string,
		verificationCode: string,
		data: ResetPasswordType,
	): Promise<StoredUserType> {
		const response = await this.post<ResetPasswordType, StoredUserType>(
			{
				url: ApiAuthEndpoints.RESET_PASSWORD(userId, verificationCode),
				data,
			},
			false,
		);

		return response.data;
	}

	async changePassword(data: ChangePasswordType): Promise<StoredUserType> {
		const response = await this.post<ResetPasswordType, StoredUserType>({
			url: ApiAuthEndpoints.CHANGE_PASSWORD,
			data,
		});

		return response.data;
	}

	async confirmEmailVerification(
		userId: string,
		verificationCode: string,
	): Promise<void> {
		await this.get<ResendEmailVerificationResponseType>({
			url: ApiAuthEndpoints.CONFIRM_EMAIL_VERIFICATION(
				userId,
				verificationCode,
			),
		});
	}

	async resendEmailVerification(
		data: ResendEmailVerificationType,
	): Promise<ResendEmailVerificationResponseType> {
		const response = await this.post<
			ResendEmailVerificationType,
			ResendEmailVerificationResponseType
		>({
			url: ApiAuthEndpoints.RESEND_EMAIL_VERIFICATION,
			data,
		});

		return response.data;
	}

	async authByToken(): Promise<StoredUserType> {
		const response = await this.get<StoredUserType>({
			url: ApiAuthEndpoints.CURRENT_USER,
		});

		return response.data;
	}

	async updateProfile(data: UpdateProfileType): Promise<StoredUserType> {
		const response = await this.post<UpdateProfileType, StoredUserType>({
			url: ApiAuthEndpoints.UPDATE_PROFILE,
			data,
		});

		return response.data;
	}
}

export const authService = new AuthService();
