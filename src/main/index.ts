/** @format */
import getAuthRouter from 'auth/routers/AuthRouter';
import configure from './config';
import express from 'express';
import getRestaurantRouter from 'restaurant/router/RestaurantRouter';
import LoginService from 'auth/service/LoginService';
import SignupService from 'auth/service/SignupService';
import JwtService from 'auth/service/JwtService';
import UserRepository from 'auth/repository/UserRepository';
import getDatabaseParams from 'config/database';
import RestaurantFindByIdService from 'restaurant/service/RestaurantFindByIdService';
import RestaurantRepository from 'restaurant/repositories/RestaurantRepository';
import RestaurantDeletionService from 'restaurant/service/RestaurantDeletionService';
import RestaurantCreationService from 'restaurant/service/RestaurantCreationService';

const main = async () => {
	await configure();
	const port=process.env.PORT ?? 3000
	const app=express();
	const userRespository:UserRepository|undefined=getDatabaseParams().userRepository;
	const restaurantRespository:RestaurantRepository|undefined=getDatabaseParams().restaurantRepository;
	if(!userRespository)return
	if(!restaurantRespository)return
	const loginService:LoginService=new LoginService(userRespository)
	const signupService:SignupService=new SignupService(userRespository)
	const jwtService:JwtService=new JwtService()
	const restaurantFindByIdService:RestaurantFindByIdService=new RestaurantFindByIdService(restaurantRespository)
	const restaurantDeletionService:RestaurantDeletionService=new RestaurantDeletionService(restaurantRespository)
	const restaurantCreationService:RestaurantCreationService=new RestaurantCreationService(restaurantRespository)
	app.use('/api/v1/auth',getAuthRouter(loginService,signupService,jwtService))
	app.use('/api/v1/restaurant',getRestaurantRouter(restaurantCreationService,restaurantFindByIdService,restaurantDeletionService))
	app.listen(port,()=>{
		console.log('App is running on port: ',port)
	})

};

main();
