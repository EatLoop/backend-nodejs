/** @format */

import User from 'auth/model/User';
import UserRepository from 'auth/repository/UserRepository';
import * as bcrypt from 'bcrypt';
import authDetails from 'config/auth';
import validateUserDetails from 'validation/UserSignupRequestValidation';

export default class SignupService {
	constructor(private readonly userRepository: UserRepository) {}

	async signup(name: string, email: string, password: string) {
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) throw new Error('User already exists');
		if (!authDetails.bcryptSaltRounds) throw new Error('BCRYPT_SALT_ROUNDS is not set');
		validateUserDetails(name, email, password);
		name = name.trim();
		email = email.trim();
		password = password.trim();
		const passwordHash = bcrypt.hashSync(password, authDetails.bcryptSaltRounds);
		const user = new User(email, name, passwordHash);
		return await this.userRepository.createUser(user);
	}
}
