import {configureDatabase} from './database';
import {configureAuth} from './auth';
import {configureEnvironment} from './environment';

const configure=async()=>{
      configureEnvironment();
      console.log('Environment configured');
      configureAuth();
      console.log('Auth configured');
      await configureDatabase();
      console.log('Database configured');
}
export default configure;

