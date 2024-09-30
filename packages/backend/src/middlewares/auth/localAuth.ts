import { HttpError } from '@/helpers/HttpError';
import { userService } from '@/services/user.service';
import { UserType } from '@/types/auth.type';
import passport from 'passport';
import { Strategy as LocalStrategy, IStrategyOptions } from 'passport-local';

const options: IStrategyOptions = {
	usernameField: 'email',
	passwordField: 'password',
};

passport.use(
	new LocalStrategy(options, async function (
		email: string,
		password: string,
		done: (
			error: Error | null,
			user?: UserType | false,
			options?: { message: string },
		) => void,
	) {
		try {
			const user = await userService.findUserByEmail(email);

			if (!user) {
				return done(HttpError(404, 'Not found'), false);
			}

			if (!user.verified) {
				return done(
					HttpError(403, 'Forbidden. You did not verify your email!'),
					false,
				);
			}

			const isValidPassword = await userService.verifyPassword(
				user.password,
				password,
			);

			if (!isValidPassword) {
				return done(HttpError(401, 'Incorrect password'), false);
			}

			return done(null, user);
		} catch (error) {
			return done(HttpError(400, 'Bad request'), false);
		}
	}),
);

export const localAuth = passport.authenticate('local', {
	session: false,
});
