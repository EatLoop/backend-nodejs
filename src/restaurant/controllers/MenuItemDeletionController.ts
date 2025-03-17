/** @format */

import MenuItemDeletionService from '../service/MenuItemDeletionService';
import { Request, Response } from 'express';
import { AuthRequest } from '../../auth/middleware/JwtFilter';

export default function getMenuItemDeletionController(service: MenuItemDeletionService) {

	return async(req:Request,res:Response): Promise<void> => {
	try {
		const authRequest=req as AuthRequest
		const menuRequest=req.body
		const userId=authRequest.userId
		await service.deleteMenuItem(menuRequest,userId);
		res.status(204).json({message:'Deleted Menu item Successfully'})
	} catch (error) {
		res.status(400).json({error})
	}
	}
}