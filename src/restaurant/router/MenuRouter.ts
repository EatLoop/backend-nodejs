/** @format */

import {Router} from 'express';
import getMenuFindByIdController from '../controllers/MenuFindByIdController';
import MenuFindByIdService from '../service/MenuFindByIdService';

export default function getMenuRouter(menuFindByIdService: MenuFindByIdService) {
	const router = Router();
	router.get('/:restaurantId', getMenuFindByIdController(menuFindByIdService));
	return router;
}
