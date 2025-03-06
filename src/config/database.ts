/** @format */

import {DataSource, DataSourceOptions} from 'typeorm';
import UserRepository from '../auth/repository/UserRepository';
import entities from '../entities';
const DATABASE_TYPE = 'postgres';

interface DatabaseParameters {
	dataSource: DataSource | null;
	userRepository: UserRepository | null;
}

const databaseParameters: DatabaseParameters = {dataSource: null, userRepository: null};

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
	databaseParameters.dataSource = dataSource;
	databaseParameters.userRepository = userRepository;
};
const getDatabaseParams = () => {
	return databaseParameters;
};

export default getDatabaseParams;
