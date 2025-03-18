/** @format */

import express from 'express';
import login from '../controller/LoginController';
import register from '../controller/RegisterController';
import JwtService from '../service/JwtService';
import LoginService from '../service/LoginService';
import SignupService from '../service/SignupService';
import getRefreshTokenController from '../controller/RefreshTokenController';
import RestaurantOwnerCreationService from '../service/RestaurantOwnerCreationService';
import getRestaurantOwnerCreationController from '../controller/RestaurantOwnerCreationController';

const getAuthRouter = (loginService: LoginService, signupService: SignupService, jwtService: JwtService, restaurantOwnerCreationService: RestaurantOwnerCreationService): express.Router => {
	const router = express.Router();

	router.post('/login', login(loginService, jwtService));
	router.post('/register', register(signupService, jwtService));
	router.post('/refresh', getRefreshTokenController(jwtService));
	router.post('/restaurant_owner', getRestaurantOwnerCreationController(restaurantOwnerCreationService, jwtService));

	return router;
};

export default getAuthRouter;
