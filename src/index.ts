/** @format */

import configureEnvironment from './config/environment';
import {configureDatabase} from './config/database';
import { configureAuth } from './config/auth';

const main = async () => {
	configureEnvironment();
	configureAuth();
	await configureDatabase();
      console.log('Configurations complete')
};

main();
