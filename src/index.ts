/** @format */
import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import configure from './config';
import LocationDeleterService from './restaurant/service/LocationDeleterService';
import ManagerUpdateService from './restaurant/service/ManagerUpdateService';
import LocationFinderByIdService from './restaurant/service/LocationFinderByIdService';
import LocationCreationService from './restaurant/service/LocationCreatorService';
import RestaurantCreationService from './restaurant/service/RestaurantCreationService';
import RestaurantDeletionService from './restaurant/service/RestaurantDeletionService';
import RestaurantFindByIdService from './restaurant/service/RestaurantFindByIdService';
import JwtService from './auth/service/JwtService';
import SignupService from './auth/service/SignupService';
import LoginService from './auth/service/LoginService';
import MenuFindByIdService from './restaurant/service/MenuFindByIdService';
import MenuCreationService from './restaurant/service/MenuCreationService';
import MenuItemCreationService from './restaurant/service/MenuItemCreationService';
import MenuItemUpdaterService from './restaurant/service/MenuItemUpdaterService';
import MenuItemDeletionService from './restaurant/service/MenuItemDeletionService';
import getAuthRouter from './auth/routers/AuthRouter';
import getRestaurantRouter from './restaurant/router/RestaurantRouter';
import getLocationRouter from './restaurant/router/LocationRouter';
import getMenuRouter from './restaurant/router/MenuRouter';
import getMenuItemRouter from './restaurant/router/MenuItemRouter';
import getDatabaseParams from './config/database';

const main = async () => {
	await configure();
	const port=process.env.PORT ?? 3000
	const app=express();
	const {restaurantRepository,roleRepository,userRepository,menuRepository,menuItemRepository,locationRepository}=getDatabaseParams();

	if(!userRepository || !restaurantRepository || !roleRepository ||!userRepository || !menuRepository || !menuItemRepository || !locationRepository)return
	const loginService=new LoginService(userRepository)
	const signupService=new SignupService(userRepository)
	const jwtService=new JwtService()
	const restaurantFindByIdService=new RestaurantFindByIdService(restaurantRepository)
	const restaurantDeletionService=new RestaurantDeletionService(restaurantRepository)
	const restaurantCreationService=new RestaurantCreationService(restaurantRepository)
	const locationCreationService=new LocationCreationService(locationRepository,restaurantRepository)
	const locationFindByIdService=new LocationFinderByIdService(locationRepository);
	const managerUpdateService=new ManagerUpdateService(locationRepository); 
	const locationDeleterService=new LocationDeleterService(locationRepository);
	const menuFindByIdService=new MenuFindByIdService(menuRepository)
	const menuCreationService=new MenuCreationService(menuRepository,restaurantRepository)
	const menuItemCreationService=new MenuItemCreationService(menuItemRepository)
	const menuItemUpdaterService=new MenuItemUpdaterService(menuItemRepository)
	const menuItemDeletionService=new MenuItemDeletionService(menuItemRepository)
	app.use(express.json())
	app.use(cors())
	app.use(morgan('dev'))
	app.use('/api/v1/auth',getAuthRouter(loginService,signupService,jwtService))
	app.use('/api/v1/restaurant',getRestaurantRouter(restaurantCreationService,restaurantFindByIdService,restaurantDeletionService))
	app.use('/api/v1/location',getLocationRouter(locationCreationService,locationFindByIdService,managerUpdateService,locationDeleterService))
	app.use('/api/v1/menu',getMenuRouter(menuFindByIdService,menuCreationService))
	app.use('/api/v1/menuItem',getMenuItemRouter(menuItemCreationService,menuItemUpdaterService,menuItemDeletionService))
	app.listen(port,()=>{
		console.log('App is running on port: ',port)
	})

};

main();
