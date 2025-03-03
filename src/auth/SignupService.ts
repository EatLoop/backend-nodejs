/** @format */

import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import User from './User';
import UserRepository from './UserRepository';
import validateUserDetails from '../validation/UserSignupRequestValidation';
import authDetails from '../config/auth';

export class SignupService {
	constructor(private readonly userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async signup(name: string, email: string, password: string) {
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) throw new Error('User already exists');
		if (!authDetails.bcryptSaltRounds) throw new Error('BCRYPT_SALT_ROUNDS is not set');
		validateUserDetails(name, email, password);
		name = name.trim();
		email = email.trim();
		password = password.trim();
		const id = uuidv4();
		const passwordHash = bcrypt.hashSync(password, authDetails.bcryptSaltRounds);
		const now = new Date();
		const user = new User(id, email, name, passwordHash, now, now);
		return await this.userRepository.createUser(user);
	}
}

