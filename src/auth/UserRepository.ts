/** @format */

import {DataSource, Repository} from 'typeorm';
import User from './User';

export default class UserRepository {
	private readonly userRepository: Repository<User>;
	private constructor(repository: Repository<User>) {
		this.userRepository = repository;
	}

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
