import JwtService from "auth/service/JwtService";
import SignupService from "auth/service/SignupService";
import { Request, Response } from "express";

const register = (signupService:SignupService,jwtService:JwtService) => async (req: Request, res: Response) => {
	const {name, email, password} = req.body;
	const {id, roles} = await signupService.signup(name, email, password);
	if (!id || !roles) {
		res.status(401).json({error: 'Invalid credentials'});
		return;
	}

	const token: string = jwtService.generateToken({userId: id, roles: roles});
	res.status(201).json({token});
};

export default register