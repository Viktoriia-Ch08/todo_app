import { prisma } from './prisma.service';
import { HttpError } from '@/helpers/HttpError';
import jwt from 'jsonwebtoken';
import { RegisterUser, UserType } from '@/types/auth.type';
import { nanoid } from 'nanoid';
import EmailService from './email-services/email.service';
import UserService from './user.service';

export default class AuthService {
	private emailService: EmailService;
	private userService: UserService;

	constructor(emailService: EmailService, userService: UserService) {
		this.emailService = emailService;
		this.userService = userService;
	}

	createToken(userId: number): string {
		return jwt.sign({ id: userId }, process.env.SECRET_KEY_JWT!, {
			expiresIn: '24h',
		});
	}

	async signup({
		username,
		email,
		password,
	}: RegisterUser): Promise<Omit<UserType, 'password'>> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			throw HttpError(409, 'Conflict');
		}

		const hashPassword = await this.userService.hashPassword(password);

		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashPassword,
			},
		});

		const emailVerification = await prisma.emailVerification.create({
			data: {
				userId: newUser.id,
				verificationCode: nanoid(),
			},
		});

		await this.emailService.sendEmailVerification(
			newUser.email,
			newUser.id,
			emailVerification.verificationCode,
		);

		return this.removeSecretInfo(newUser);
	}

	async verifyEmail(userId: number, verificationCode: string): Promise<void> {
		const emailVerification = await prisma.emailVerification.findUnique({
			where: { verificationCode },
		});

		if (!emailVerification) {
			throw HttpError(404, 'Not found');
		}

		await prisma.user.update({
			where: { id: userId },
			data: { verified: true },
		});

		await prisma.emailVerification.delete({ where: { verificationCode } });
	}

	async resendVerifyEmail(email: string): Promise<void> {
		if (!email) {
			throw HttpError(400, 'missing required field email');
		}

		const user = await prisma.user.findUnique({ where: { email } });

		if (user?.verified) {
			throw HttpError(400, 'Verification has already been passed');
		}

		const emailVerification = await prisma.emailVerification.findUnique({
			where: { userId: user!.id },
		});

		await this.emailService.sendEmailVerification(
			email,
			user!.id,
			emailVerification!.verificationCode,
		);
	}

	removeSecretInfo(user: UserType): Omit<UserType, 'password'> {
		const { password: _, ...createdUser } = user;
		return createdUser;
	}

	async changePassword(user: UserType, newPassword: string): Promise<void> {
		const hashPassword = await this.userService.hashPassword(newPassword);

		await prisma.user.update({
			where: { id: user.id },
			data: { password: hashPassword },
		});
	}

	async forgetPassword(email: string): Promise<void> {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw HttpError(404, 'Not found');
		}

		const passwordVerification = await prisma.passwordReset.create({
			data: {
				userId: user.id,
				verificationCode: nanoid(),
			},
		});

		await this.emailService.forgetPassword(
			user.email,
			user.id,
			passwordVerification.verificationCode,
		);
	}

	async resetPassword(
		verificationCode: string,
		newPassword: string,
	): Promise<Omit<UserType, 'password'>> {
		const passwordReset = await prisma.passwordReset.findUnique({
			where: {
				verificationCode,
			},
		});

		if (!passwordReset) {
			throw HttpError(404, 'Not found');
		}

		const hashPassword = await this.userService.hashPassword(newPassword);

		const updatedUser = await prisma.user.update({
			where: {
				id: passwordReset.userId,
			},
			data: {
				password: hashPassword,
			},
		});

		await prisma.passwordReset.delete({
			where: {
				verificationCode,
			},
		});

		return this.removeSecretInfo(updatedUser);
	}

	async updateUsername(
		user: UserType,
		username: string,
	): Promise<Omit<UserType, 'password'>> {
		const newUser = await prisma.user.update({
			where: { id: user.id },
			data: { username: username },
		});

		return this.removeSecretInfo(newUser);
	}
}
