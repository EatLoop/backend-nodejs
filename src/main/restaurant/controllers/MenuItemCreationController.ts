/** @format */

import MenuItemCreationService from '../service/MenuItemCreationService';
import MenuItemCreationRequest from '../dto/MenuItemCreationRequestDto';
import MenuItem from '../models/MenuItem';
import { Request, Response } from 'express';

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