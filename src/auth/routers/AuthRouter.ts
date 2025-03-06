/** @format */

import JwtService from 'auth/service/JwtService';
import LoginService from 'auth/service/LoginService';
import SignupService from 'auth/service/SignupService';
import express, {Request, Response} from 'express';

const getAuthRouter = (loginService: LoginService, signupService: SignupService,jwtService:JwtService): express.Router => {
	const router = express.Router();

	router.post('/login', async (req: Request, res: Response):Promise<void> => {
		const {email, password} = req.body;
		const {id,roles} = await loginService.login(email, password);

		if (!id || !roles){
			res.status(401).json({error: 'Invalid credentials'});
			return
		}

		const token:string=jwtService.generateToken({userId:id,roles:roles})
		res.json({token});
	});

	router.post('/register', async (req: Request, res: Response) => {
		const {name, email, password} = req.body;
		const {id,roles} = await signupService.signup(name, email, password);
		if (!id || !roles) {
			res.status(401).json({error: 'Invalid credentials'});
			return;
		}

		const token: string = jwtService.generateToken({userId: id, roles: roles});
		res.status(201).json({token});
	});

	return router;
};

export default getAuthRouter;
