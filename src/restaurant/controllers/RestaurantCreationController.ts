/** @format */

import RestaurantCreationService from '../service/RestaurantCreationService';
import RestaurantCreationRequestDto from '../dto/RestaurantCreationRequestDto';
import {NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../../auth/middleware/JwtFilter';
import { RequestHandler } from 'express-serve-static-core';
export default function getRestaurantCreationController(service: RestaurantCreationService):RequestHandler {
	return (async(req:Request,res:Response,next?:NextFunction): Promise<void>=> {
		try {
        	const authRequest = req as AuthRequest;
			const restaurantRequest:RestaurantCreationRequestDto = authRequest.body
			const restaurant=await service.createRestaurant({...restaurantRequest,main_head_id:authRequest.userId});
			res.status(201).json(restaurant);
		} catch (error:any) {
			res.status(400).json({message:error?.message ?? 'Something went wrong'});
		}
	})
}