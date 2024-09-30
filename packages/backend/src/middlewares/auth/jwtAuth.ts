import { HttpError } from '@/helpers/HttpError';
import { prisma } from '@/services/prisma.service';
import { UserType } from '@/types/auth.type';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET_KEY_JWT!,
};

passport.use(
	new JwtStrategy(options, async function (
		jwt_payload: Pick<UserType, 'id'>,
		done: (error: Error | null, user?: UserType | false) => void,
	) {
		try {
			const user = await prisma.user.findUnique({
				where: { id: jwt_payload.id },
			});
			if (!user) {
				return done(HttpError(404, 'Not Found'), false);
			} else {
				return done(null, user);
			}
		} catch (error) {
			return done(HttpError(400, 'Bad request'), false);
		}
	}),
);

export const jwtAuth = passport.authenticate('jwt', {
	session: false,
});
