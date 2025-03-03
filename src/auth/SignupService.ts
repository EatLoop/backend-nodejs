/** @format */

//genertae a signup service that will be used to signup a user

import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import User from './User';
import UserRepository from './UserRepository';

export class SignupService {
	constructor(private readonly userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async signup(name: string, email: string, password: string) {
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) throw new Error('User already exists');
		validateUserDetails(name, email, password);
		name = name.trim();
		email = email.trim();
		password = password.trim();
		const id = uuidv4();
		const passwordHash = bcrypt.hashSync(password, 10);
		const now = new Date();
		const user = new User(id, email, name, passwordHash, now, now);
		return await this.userRepository.createUser(user);
	}
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateUserDetails(name: string, email: string, password: string) {
	if (!name || !email || !password) throw new Error('Missing required fields');
	if (name.trim().length < 2) throw new Error('Name must be at least 2 characters long');

	if (!EMAIL_REGEX.test(email)) throw new Error('Invalid email format');

	// Password validation
	if (password.length < 8) throw new Error('Password must be at least 8 characters long');

	if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
}
