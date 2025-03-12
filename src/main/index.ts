/** @format */
import getAuthRouter from 'auth/routers/AuthRouter';
import JwtService from 'auth/service/JwtService';
import LoginService from 'auth/service/LoginService';
import SignupService from 'auth/service/SignupService';
import getDatabaseParams from 'config/database';
import express from 'express';
import getLocationRouter from 'restaurant/router/LocationRouter';
import getRestaurantRouter from 'restaurant/router/RestaurantRouter';
import LocationCreationService from 'restaurant/service/LocationCreatorService';
import LocationDeleterService from 'restaurant/service/LocationDeleterService';
import LocationFinderByIdService from 'restaurant/service/LocationFinderByIdService';
import ManagerUpdateService from 'restaurant/service/ManagerUpdateService';
import RestaurantCreationService from 'restaurant/service/RestaurantCreationService';
import RestaurantDeletionService from 'restaurant/service/RestaurantDeletionService';
import RestaurantFindByIdService from 'restaurant/service/RestaurantFindByIdService';
import configure from './config';

const main = async () => {
	await configure();
	const port=process.env.PORT ?? 3000
	const app=express();
	const {restaurantRepository,roleRepository,userRepository,menuRepository,menuItemRepository,locationRepository}=getDatabaseParams();

	if(!userRepository || !restaurantRepository || !roleRepository ||!userRepository || !menuRepository || !menuItemRepository || !locationRepository)return
	const loginService:LoginService=new LoginService(userRepository)
	const signupService:SignupService=new SignupService(userRepository)
	const jwtService:JwtService=new JwtService()
	const restaurantFindByIdService=new RestaurantFindByIdService(restaurantRepository)
	const restaurantDeletionService=new RestaurantDeletionService(restaurantRepository)
	const restaurantCreationService=new RestaurantCreationService(restaurantRepository)
	const locationCreationService=new LocationCreationService(locationRepository,restaurantRepository)
	const locationFindByIdService: LocationFinderByIdService=new LocationFinderByIdService(locationRepository);
	const managerUpdateService: ManagerUpdateService=new ManagerUpdateService(locationRepository); 
	const locationDeleterService: LocationDeleterService=new LocationDeleterService(locationRepository);
	app.use('/api/v1/auth',getAuthRouter(loginService,signupService,jwtService))
	app.use('/api/v1/restaurant',getRestaurantRouter(restaurantCreationService,restaurantFindByIdService,restaurantDeletionService))
	app.use('/api/v1/location',getLocationRouter(locationCreationService,locationFindByIdService,managerUpdateService,locationDeleterService))
	app.listen(port,()=>{
		console.log('App is running on port: ',port)
	})

};

main();
