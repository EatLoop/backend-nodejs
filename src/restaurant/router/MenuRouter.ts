import { Router } from "express";
import getMenuCreationController from "../controllers/MenuCreationController";
import getMenuFindByIdController from "../controllers/MenuFindByIdController";
import MenuCreationService from "../service/MenuCreationService";
import MenuFindByIdService from "../service/MenuFindByIdService";
import { authenticate, requireRole } from '../../auth/middleware/JwtFilter';

export default function getMenuRouter(menuFindByIdService:MenuFindByIdService,
    menuCreationService:MenuCreationService){
    const router=Router();
    router.post('/',authenticate,requireRole('RESTAURANT_OWNER'),getMenuCreationController(menuCreationService));
    router.get('/:restaurantId',(getMenuFindByIdController(menuFindByIdService)));
    return router;
}