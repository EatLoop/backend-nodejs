/** @format */

import {Request, Response} from 'express';
import JwtService from '../service/JwtService';
import SignupService from '../service/SignupService';

const register = (signupService: SignupService, jwtService: JwtService) => async (req: Request, res: Response) => {
	const {name, email, password} = req.body;
	const {id, roles} = await signupService.signup(name, email, password);
	if (!id || !roles) {
		res.status(401).json({error: 'Invalid credentials'});
		return;
	}

	const token: string = jwtService.generateToken({userId: id, roles: roles});
	res.status(201).json({token});
};

export default register;
