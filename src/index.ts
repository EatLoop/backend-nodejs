/** @format */
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import getAuthRouter from './auth/routers/AuthRouter';
import JwtService from './auth/service/JwtService';
import LoginService from './auth/service/LoginService';
import RestaurantOwnerCreationService from './auth/service/RestaurantOwnerCreationService';
import SignupService from './auth/service/SignupService';
import configure from './config';
import getDatabaseParams from './config/database';
import getLocationRouter from './restaurant/router/LocationRouter';
import getMenuItemRouter from './restaurant/router/MenuItemRouter';
import getMenuRouter from './restaurant/router/MenuRouter';
import getRestaurantRouter from './restaurant/router/RestaurantRouter';
import LocationCreationService from './restaurant/service/LocationCreatorService';
import LocationDeleterService from './restaurant/service/LocationDeleterService';
import LocationFinderByIdService from './restaurant/service/LocationFinderByIdService';
import ManagerUpdateService from './restaurant/service/ManagerUpdateService';
import MenuFindByIdService from './restaurant/service/MenuFindByIdService';
import MenuItemCreationService from './restaurant/service/MenuItemCreationService';
import MenuItemDeletionService from './restaurant/service/MenuItemDeletionService';
import MenuItemUpdaterService from './restaurant/service/MenuItemUpdaterService';
import RestaurantCreationService from './restaurant/service/RestaurantCreationService';
import RestaurantDeletionService from './restaurant/service/RestaurantDeletionService';
import RestaurantFindByIdService from './restaurant/service/RestaurantFindByIdService';

const main = async () => {
	await configure();
	const port = process.env.PORT ?? 3000;
	const app = express();
	const {restaurantRepository, roleRepository, userRepository, menuRepository, menuItemRepository, locationRepository} = getDatabaseParams();

	if (!userRepository || !restaurantRepository || !roleRepository || !userRepository || !menuRepository || !menuItemRepository || !locationRepository) return;
	const loginService = new LoginService(userRepository);
	const signupService = new SignupService(userRepository);
	const jwtService = new JwtService();
	const restaurantFindByIdService = new RestaurantFindByIdService(restaurantRepository);
	const restaurantDeletionService = new RestaurantDeletionService(restaurantRepository);
	const restaurantCreationService = new RestaurantCreationService(restaurantRepository,menuRepository);
	const locationCreationService = new LocationCreationService(locationRepository, restaurantRepository);
	const locationFindByIdService = new LocationFinderByIdService(locationRepository);
	const managerUpdateService = new ManagerUpdateService(locationRepository);
	const locationDeleterService = new LocationDeleterService(locationRepository);
	const menuFindByIdService = new MenuFindByIdService(menuRepository);
	const menuItemCreationService = new MenuItemCreationService(menuItemRepository);
	const menuItemUpdaterService = new MenuItemUpdaterService(menuItemRepository);
	const menuItemDeletionService = new MenuItemDeletionService(menuItemRepository);
	const restaurantOwnerCreationService = new RestaurantOwnerCreationService(userRepository);
	app.use(express.json());
	app.use(cors());
	app.use(morgan('dev'));
	app.use('/api/v1/auth', getAuthRouter(loginService, signupService, jwtService, restaurantOwnerCreationService));
	app.use('/api/v1/restaurant', getRestaurantRouter(restaurantCreationService, restaurantFindByIdService, restaurantDeletionService));
	app.use('/api/v1/location', getLocationRouter(locationCreationService, locationFindByIdService, managerUpdateService, locationDeleterService));
	app.use('/api/v1/menu', getMenuRouter(menuFindByIdService));
	app.use('/api/v1/menuItem', getMenuItemRouter(menuItemCreationService, menuItemUpdaterService, menuItemDeletionService));
	app.listen(port, () => {
		console.log('App is running on port: ', port);
	});
};

main();
