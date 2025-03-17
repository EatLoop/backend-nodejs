
import * as bcrypt from 'bcrypt';
import UserRepository from '../repository/UserRepository';
import validateUserDetails from '../../validation/UserLoginRequestValidator';
import RoleRepository from '../repository/RoleRepository';

export default class LoginService {
	constructor(private readonly userRepository: UserRepository) {
		this.userRepository = userRepository;
	}
      async login(email:string, password:string){
        validateUserDetails(email, password);
        const user = await this.userRepository.findByEmail(email);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) throw new Error('Invalid password');
        return user;
      }
}



