/** @format */

import {Request, Response} from 'express';
import MenuFindByIdService from '../service/MenuFindByIdService';

export default function getMenuFindByIdController(service: MenuFindByIdService) {
	return async (req: Request, res: Response): Promise<void> => {
		try {
			const restaurantId = req.params.id;
			const menuId = await service.findByRestaurantId(restaurantId);
			if (!menuId) throw new Error('no menu recieved from db');
			res.json({menuId});
		} catch (error) {
			res.status(400).json({error});
		}
	};
}
