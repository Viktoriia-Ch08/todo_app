import AuthService from '@/services/auth.service';
import EmailService from '@/services/email-services/email.service';
import UserService from '@/services/user.service';
import { UserType } from '@/types/auth.type';
import { Request, Response } from 'express';

export class AuthController {
	constructor(private authService: AuthService) {}

	async signup(req: Request, res: Response): Promise<void> {
		const user = await this.authService.signup(req.body);
		const token = await this.authService.createToken(user.id);
		res.send({ user, token });
	}

	async verifyEmail(req: Request, res: Response): Promise<void> {
		const { userId, verificationCode } = req.params;
		await this.authService.verifyEmail(+userId, verificationCode);
		res.send({ message: 'Verification has been completed' });
	}

	async resendEmailVerification(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		await this.authService.resendVerifyEmail(email);
		res.send({
			message: 'Verification email sent',
		});
	}

	async login(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const token = await this.authService.createToken(user.id);
		res.send({
			token,
			user: this.authService.removeSecretInfo(user),
		});
	}

	async changePassword(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const { newPassword } = req.body;
		await this.authService.changePassword(user, newPassword);
		res.send({
			message: 'Password has been successfully updated',
		});
	}

	async forgetPassword(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		await this.authService.forgetPassword(email);
		res.send({
			message: 'Confirm your password reseting by email',
		});
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		const { verificationCode } = req.params;
		const { newPassword } = req.body;
		const user = await this.authService.resetPassword(
			verificationCode,
			newPassword,
		);
		res.send(user);
	}

	currentUser(req: Request, res: Response): void {
		const user = req.user as UserType;

		res.send(this.authService.removeSecretInfo(user));
	}

	async updateUser(req: Request, res: Response): Promise<void> {
		const user = req.user as UserType;
		const { username } = req.body;
		const newUser = await this.authService.updateUsername(user, username);
		res.send(newUser);
	}
}

const authController = new AuthController(
	new AuthService(new EmailService(), new UserService()),
);
export default authController;
