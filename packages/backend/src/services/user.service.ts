import { UserType } from '@/types/auth.type';
import bcrypt from 'bcrypt';
import { prisma } from './prisma.service';

export default class UserService {
	async verifyPassword(
		storedPassword: string,
		inputPassword: string,
	): Promise<boolean> {
		return bcrypt.compare(inputPassword, storedPassword);
	}

	async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	async findUserByEmail(email: string): Promise<UserType | null> {
		return await prisma.user.findUnique({
			where: { email },
		});
	}
}

export const userService = new UserService();
