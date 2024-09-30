import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IAuthStore } from '~shared/interfaces/auth-store-interface';
import { STORAGE_KEYS } from '~shared/keys/api-keys';
import { authService } from '~shared/services/auth-service';
import {
	ChangePasswordType,
	ForgetPasswordType,
	LoginUserType,
	ResendEmailVerificationType,
	ResetPasswordType,
	SignupUserType,
	UpdateProfileType,
} from '~shared/types/auth-types';

export const useAuthStore = create<IAuthStore>()(
	immer((set) => {
		return {
			user: null,
			fetching: true,

			signup: async (data: SignupUserType): Promise<void> => {
				const newUser = await authService.signup(data);
				set((state) => {
					state.user = newUser.user;
				});
			},

			login: async (data: LoginUserType): Promise<void> => {
				const userInfo = await authService.login(data);
				set((state) => {
					state.user = userInfo.user;
				});
			},

			forgetPassword: async (data: ForgetPasswordType): Promise<void> => {
				await authService.forgetPassword(data);
			},

			resetPassword: async (
				userId: string,
				verificationCode: string,
				data: ResetPasswordType,
			): Promise<void> => {
				await authService.resetPassword(userId, verificationCode, data);
			},

			changePassword: async (data: ChangePasswordType): Promise<void> => {
				await authService.changePassword(data);
			},

			confirmEmailVerification: async (
				userId: string,
				verificationCode: string,
			): Promise<void> => {
				await authService.confirmEmailVerification(
					userId,
					verificationCode,
				);
			},

			resendEmailVerification: async (
				data: ResendEmailVerificationType,
			): Promise<void> => {
				await authService.resendEmailVerification(data);
			},

			logout: (): void => {
				set((state) => {
					state.user = null;
				});
				localStorage.removeItem(STORAGE_KEYS.TOKEN);
			},

			authByToken: async (): Promise<void> => {
				try {
					const user = await authService.authByToken();

					set((state) => {
						state.fetching = false;
						state.user = user;
					});
				} catch (err) {
					set((state) => {
						state.fetching = false;
						state.user = null;
					});
				}
			},
			updateProfile: async (data: UpdateProfileType): Promise<void> => {
				const user = await authService.updateProfile(data);
				set((state) => {
					state.user = user;
				});
			},
		};
	}),
);
