
import { Request, Response } from 'express';
import { AuthRequest } from '../../auth/middleware/JwtFilter';
import MenuCreationService from '../service/MenuCreationService';

export default function getMenuCreationController(service: MenuCreationService) {
	return async(req:Request,res:Response): Promise<void> =>{
		try {
			const authRequest=req as AuthRequest
			const userId=authRequest.userId
			const restaurantId=req.body.restaurantId
			const savedmenu=await service.createMenu(restaurantId,userId)
		res.status(201).json(savedmenu)
		} catch (error) {
			res.status(400).json({error})
		}
	}
}