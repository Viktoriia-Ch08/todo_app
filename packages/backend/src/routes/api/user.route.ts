import authController from '@/controllers/auth.controller';
import { exceptionHandler } from '@/helpers/exceptionHandler';
import { changePasswordSchema } from '@/joi-schemas/auth/joi-change-password-schema';
import { forgetPasswordSchema } from '@/joi-schemas/auth/joi-forget-password-schema';
import { loginSchema } from '@/joi-schemas/auth/joi-login-schema';
import { resetPasswordSchema } from '@/joi-schemas/auth/joi-reset-password-schema';
import { signupSchema } from '@/joi-schemas/auth/joi-signup-schema';
import { jwtAuth } from '@/middlewares/auth/jwtAuth';
import { localAuth } from '@/middlewares/auth/localAuth';
import { isBodyEmpty } from '@/middlewares/isBodyEmpty';
import { validateBody } from '@/middlewares/validateBody';

import { Router } from 'express';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
	'/register',
	validateBody(signupSchema),
	exceptionHandler(authController.signup.bind(authController)),
);

router.get(
	'/verify/:userId/:verificationCode',
	exceptionHandler(authController.verifyEmail.bind(authController)),
);

router.post(
	'/verify',
	exceptionHandler(
		authController.resendEmailVerification.bind(authController),
	),
);

router.post(
	'/login',
	isBodyEmpty,
	validateBody(loginSchema),
	localAuth,
	exceptionHandler(authController.login.bind(authController)),
);

router.post(
	'/change-password',
	isBodyEmpty,
	validateBody(changePasswordSchema),
	localAuth,
	exceptionHandler(authController.changePassword.bind(authController)),
);

router.post(
	'/forget-password',
	isBodyEmpty,
	validateBody(forgetPasswordSchema),
	exceptionHandler(authController.forgetPassword.bind(authController)),
);

router.post(
	'/reset-password/:userId/:verificationCode',
	isBodyEmpty,
	validateBody(resetPasswordSchema),
	exceptionHandler(authController.resetPassword.bind(authController)),
);

router.get(
	'/current-user',
	jwtAuth,
	authController.currentUser.bind(authController),
);

router.post(
	'/update-user',
	jwtAuth,
	authController.updateUser.bind(authController),
);

export default router;
