/** @format */

import configureEnvironment from './config/environment';
import {configureDatabase} from './config/database';


const main = async () => {
	configureEnvironment();
	await configureDatabase();
      console.log('Configurations complete')

};

main();
