import { Router } from "express";
import getMenuItemCreationController from "../controllers/MenuItemCreationController";
import getMenuItemDeletionController from "../controllers/MenuItemDeletionController";
import getMenuItemUpdaterController from "../controllers/MenuItemUpdaterController";
import MenuItemCreationService from "../service/MenuItemCreationService";
import MenuItemDeletionService from "../service/MenuItemDeletionService";
import MenuItemUpdaterService from "../service/MenuItemUpdaterService";
import { authenticate, requireRole } from '../../auth/middleware/JwtFilter';

export default function getMenuItemRouter(menuItemCreationService:MenuItemCreationService,
    menuItemUpdaterService:MenuItemUpdaterService,
    menuItemDeletionService:MenuItemDeletionService){
    const router=Router();
    router.post('/',authenticate,requireRole('RESTAURANT_OWNER'),getMenuItemCreationController(menuItemCreationService));
    router.put('/',authenticate,getMenuItemUpdaterController(menuItemUpdaterService))
    router.delete('/:id',getMenuItemDeletionController(menuItemDeletionService))
    return router;
}