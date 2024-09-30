import { MailDataRequired } from '@sendgrid/mail';

const CLIENT_URL = process.env.CLIENT_URL;

export const verifyEmail = (
	email: string,
	userId: number,
	verificationCode: string,
): MailDataRequired => {
	return {
		to: email,
		from: process.env.OWNER_EMAIL!,
		subject: 'Verify your email',
		html: `<p>Please confirm your email to continue using our app!</p>
			<a href="${CLIENT_URL}/todos/verify/${+userId}/${verificationCode}" target="_blank">Verify your email</a>`,
	};
};

export const forgetPassword = (
	email: string,
	userId: number,
	verificationCode: string,
): MailDataRequired => {
	return {
		to: email,
		from: process.env.OWNER_EMAIL!,
		subject: 'Reset password',
		html: `<p>Please confirm you want reset your password</p>
			<a href="${CLIENT_URL}/todos/reset-password/${+userId}/${verificationCode}" target="_blank">Reset your password</a>`,
	};
};
