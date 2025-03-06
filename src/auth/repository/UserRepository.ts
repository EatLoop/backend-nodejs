/** @format */

import User from 'auth/model/User';
import {DataSource, Repository} from 'typeorm';

export default class UserRepository {
	private constructor(private readonly userRepository: Repository<User>) {}

	static async initialize(dataSource: DataSource): Promise<UserRepository> {
		const repository = dataSource.getRepository(User);
		return new UserRepository(repository);
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({where: {email}});
	}

	async createUser(user: User): Promise<User> {
		return this.userRepository.save(user);
	}
}
