/** @format */

import RestaurantFindByIdService from '../service/RestaurantFindByIdService';
import Restaurant from '../models/Restaurant';
import { Request, Response } from 'express';

export default function getRestaurantFindByIdController(service: RestaurantFindByIdService) {
	return async(req:Request,res:Response): Promise<void> => {
		const restaurantId:string=req.params.restaurantId
		const restaurant:Restaurant|null=await service.findById(restaurantId);
		if(!restaurant){
			res.status(404).json({message:'Error: no restaurant found with given id'})
			return
		}
		res.status(200).json(restaurant)
	}
}