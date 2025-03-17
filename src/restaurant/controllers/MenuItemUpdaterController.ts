/** @format */

import MenuItemUpdaterService from '../service/MenuItemUpdaterService';
import { Request, Response } from 'express';

export default function getMenuItemUpdaterController(service: MenuItemUpdaterService) {
	return async(req:Request,res:Response): Promise<void> => {
		try {
			const body=req.body
			const responseBody=await service.updateMenuItem(body)
			res.json({responseBody})
		} catch (error) {
			res.status(400).json({error})
		}
	}
}