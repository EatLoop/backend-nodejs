/** @format */

import {Request, Response} from 'express';
import JwtService from '../service/JwtService';
import LoginService from '../service/LoginService';

const login =
	(loginService: LoginService, jwtService: JwtService) =>
	async (req: Request, res: Response): Promise<void> => {
		const {email, password} = req.body;
		const {id, roles} = await loginService.login(email, password);

		if (!id || !roles) {
			res.status(401).json({error: 'Invalid credentials'});
			return;
		}

		const token: string = jwtService.generateToken({userId: id, roles: roles});
		res.json({token});
	};
export default login;
