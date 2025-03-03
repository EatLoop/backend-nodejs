/** @format */

import {DataSource, DataSourceOptions} from 'typeorm';
import {User} from '../auth/User';
import UserRepository from '../auth/UserRepository';
const DATABASE_TYPE = 'postgres';

let dataSource: DataSource;
const getDataSource: () => Promise<DataSource> = async () => {
	if (dataSource) return dataSource;
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
		entities: [User],
		synchronize: process.env.NODE_ENV !== 'production',
		logging: process.env.NODE_ENV !== 'production',
		dropSchema: process.env.NODE_ENV !== 'production',
		logger: 'simple-console',
	};
	dataSource = new DataSource(options);
	try {
		await dataSource.initialize();
		console.log('Database connected successfully');
	} catch (error) {
		console.error('Error initializing database', error);
	}
	return dataSource;
};
const databaseParameters:{
      dataSource:DataSource | null,
      userRepository:UserRepository | null
} = {dataSource:null, userRepository:null};
export const configureDatabase = async () => {
	const dataSource = await getDataSource();
	await dataSource.initialize();
	const userRepository = await UserRepository.initialize(dataSource);
	databaseParameters.dataSource = dataSource;
	databaseParameters.userRepository = userRepository;
};
const getDatabaseParams = () => {
	return databaseParameters;
};

export default getDatabaseParams;