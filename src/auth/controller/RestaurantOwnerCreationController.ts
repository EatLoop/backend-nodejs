/** @format */

import {Request, Response} from 'express';
import RestaurantOwnerCreationService from '../service/RestaurantOwnerCreationService';
import JwtService from '../service/JwtService';

export default function getRestaurantOwnerCreationController(restaurantOwnerCreationService: RestaurantOwnerCreationService, jwtService:JwtService) {
	return async (req: Request, res: Response) => {
		const {name, email, password} = req.body;
		const {id, roles} = await restaurantOwnerCreationService.signup(name, email, password);
		if (!id || !roles) {
			res.status(401).json({error: 'Invalid credentials'});
			return;
		}

		const token: string = jwtService.generateToken({userId: id, roles: roles});
		res.status(201).json({token});
	};
}
