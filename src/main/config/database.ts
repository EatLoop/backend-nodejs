/** @format */

import {DataSource, DataSourceOptions} from 'typeorm';
import RoleRepository from 'auth/repository/RoleRepository';
import UserRepository from 'auth/repository/UserRepository';
import entities from 'entities';
const DATABASE_TYPE = 'postgres';

interface DatabaseParameters {
	dataSource?: DataSource;
	userRepository?: UserRepository;
	roleRepository?: RoleRepository;
}

let databaseParameters: DatabaseParameters = {};

export const configureDatabase = async () => {
	if (databaseParameters.dataSource) return databaseParameters.dataSource;
	const {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env;
	if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_NAME) {
		console.error({DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME});
		throw new Error('Missing database configuration');
	}
	const options: DataSourceOptions = {
		type: DATABASE_TYPE,
		host: DB_HOST,
		port: parseInt(DB_PORT),
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		entities,
		synchronize: process.env.NODE_ENV !== 'production',
		logging: process.env.NODE_ENV !== 'production',
		dropSchema: process.env.NODE_ENV !== 'production',
		logger: 'simple-console',
	};
	const dataSource = new DataSource(options);
	try {
		await dataSource.initialize();
	} catch (error) {
		console.error('Error initializing database', error);
	}
	const userRepository = await UserRepository.initialize(dataSource);
	const roleRepository=await RoleRepository.initialize(dataSource)
	databaseParameters={
		dataSource,userRepository,roleRepository
	}
};
const getDatabaseParams = () => {
	return databaseParameters;
};

export default getDatabaseParams;
