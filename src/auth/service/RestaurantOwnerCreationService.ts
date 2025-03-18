import authDetails from "../../config/auth";
import UserRepository from "../repository/UserRepository";
import validateUserDetails from "../../validation/UserSignupRequestValidation";
import User from "../model/User";
import bcrypt from 'bcrypt'
import Role from "../model/Role";

export default class RestaurantOwnerCreationService {
	constructor(private readonly userRepository: UserRepository) {}

	async signup(name: string, email: string, password: string) {
		const userAlreadyExists = await this.userRepository.existsByEmail(email);
		if (userAlreadyExists) throw new Error('User already exists');
		if (!authDetails.bcryptSaltRounds) throw new Error('BCRYPT_SALT_ROUNDS is not set');
		validateUserDetails(name, email, password);
		name = name.trim();
		email = email.trim();
		password = password.trim();
		const passwordHash = bcrypt.hashSync(password, authDetails.bcryptSaltRounds);
		const user = new User(email, name, passwordHash);
		user.roles = [new Role('RESTAURANT_OWNER', []), new Role('USER', [])];
		return this.userRepository.createUser(user);
	}
}