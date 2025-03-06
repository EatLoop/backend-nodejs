/** @format */

import express from 'express';
import login from 'auth
/controller/LoginController';
import register from 'auth
/controller/RegisterController';
import JwtService from 'auth
/service/JwtService';
import LoginService from 'auth
/service/LoginService';
import SignupService from 'auth
/service/SignupService';

const getAuthRouter = (loginService: LoginService, signupService: SignupService, jwtService: JwtService): express.Router => {
	const router = express.Router();

	router.post('/login', login(loginService, jwtService));
	router.post('/register', register(signupService, jwtService));

	return router;
};

export default getAuthRouter;
