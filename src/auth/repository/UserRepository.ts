/** @format */

import {DataSource, Repository} from 'typeorm';
import User from '../model/User';
import Role from '../model/Role';

export default class UserRepository {
	async existsByEmail(email: string) {
		return this.userRepository.existsBy({email});
	}
	private constructor(private readonly userRepository: Repository<User>) {}

	static async initialize(dataSource: DataSource): Promise<UserRepository> {
		const repository = dataSource.getRepository(User);
		return new UserRepository(repository);
	}

	async findByEmail(email: string): Promise<{roles:Role[],id: string; password: string}> {
		const user = await this.userRepository
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.roles', 'role') // Join the roles relationship
			.select(['user.id', 'user.password', 'role.name']) // Select user ID, password, and role names
			.where('user.email = :email', {email})
			.getOne();
		if (!user?.id || !user.password ||!user.roles) {
			throw new Error('No such user exists');
		}

		return {
			roles:user.roles,
			id: user.id,
			password: user.password,
		};
	}

	async createUser(user: User): Promise<User> {
		return this.userRepository.save(user);
	}
}
