import { Router } from "express";
import getMenuCreationController from "restaurant/controllers/MenuCreationController";
import getMenuFindByIdController from "restaurant/controllers/MenuFindByIdController";
import MenuCreationService from "restaurant/service/MenuCreationService";
import MenuFindByIdService from "restaurant/service/MenuFindByIdService";
import { authenticate, requireRole } from '../../auth/middleware/JwtFilter';

export default function getMenuRouter(menuFindByIdService:MenuFindByIdService,
    menuCreationService:MenuCreationService){
    const router=Router();
    router.post('/',authenticate,requireRole('RESTAURANT_OWNER'),getMenuCreationController(menuCreationService));
    router.get('/:restaurantId',(getMenuFindByIdController(menuFindByIdService)));
    return router;
}