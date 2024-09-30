import { User } from '@prisma/client';

export type UserType = User;
export type RegisterUser = Omit<User, 'id'>;
