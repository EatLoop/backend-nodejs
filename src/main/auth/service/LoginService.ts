
import * as bcrypt from 'bcrypt';
import UserRepository from '../repository/UserRepository';
import validateUserDetails from '../../validation/UserLoginRequestValidator';

export default class LoginService {
	constructor(private readonly userRepository: UserRepository) {
		this.userRepository = userRepository;
	}
      async login(email:string, password:string){
        validateUserDetails(email, password);
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new Error('User not found');
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) throw new Error('Invalid password');
        return user;
      }
}



