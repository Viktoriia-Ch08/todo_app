import sgMail, { MailService } from '@sendgrid/mail';
import { forgetPassword, verifyEmail } from './email-messages';

export default class EmailService {
	private apiKey: string;
	private emailService: MailService;

	constructor(apiKey = process.env.SENDGRID_API_KEY, emailService = sgMail) {
		this.apiKey = apiKey!;
		this.emailService = emailService;
	}

	connectToSendGrid(): void {
		this.emailService.setApiKey(this.apiKey);
	}

	async sendEmailVerification(
		email: string,
		userId: number,
		verificationCode: string,
	): Promise<void> {
		this.connectToSendGrid();
		await sgMail.send(verifyEmail(email, userId, verificationCode));
	}

	async forgetPassword(
		email: string,
		userId: number,
		verificationCode: string,
	): Promise<void> {
		this.connectToSendGrid();
		await sgMail.send(forgetPassword(email, userId, verificationCode));
	}
}
