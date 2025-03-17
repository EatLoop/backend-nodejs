/** @format */

import { Request, Response } from 'express';
import MenuItemCreationRequest from '../dto/MenuItemCreationRequestDto';
import MenuItemCreationService from '../service/MenuItemCreationService';

export default function getMenuItemCreationController(service: MenuItemCreationService) {

	return async(req:Request,res:Response): Promise<void> =>{
		try {
			const body:MenuItemCreationRequest=req.body
			const menuItem=await service.createMenuItem(body)
			res.status(201).json(menuItem)
		} catch (error) {
			res.status(400).json({error})
		}
	}
}