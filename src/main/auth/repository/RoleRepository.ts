/** @format */

import Role from '../model/Role';
import {DataSource, Repository} from 'typeorm';

export default class RoleRepository {
	constructor(private readonly roleRepository: Repository<Role>) {}
	static async initialize(datasource: DataSource): Promise<RoleRepository> {
		const roleRepository = datasource.getRepository(Role);
		return new RoleRepository(roleRepository);
	}
}
