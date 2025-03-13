import { Router } from "express";
import getMenuItemCreationController from "restaurant/controllers/MenuItemCreationController";
import getMenuItemDeletionController from "restaurant/controllers/MenuItemDeletionController";
import getMenuItemUpdaterController from "restaurant/controllers/MenuItemUpdaterController";
import MenuItemCreationService from "restaurant/service/MenuItemCreationService";
import MenuItemDeletionService from "restaurant/service/MenuItemDeletionService";
import MenuItemUpdaterService from "restaurant/service/MenuItemUpdaterService";
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