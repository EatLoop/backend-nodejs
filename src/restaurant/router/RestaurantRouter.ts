import { Router } from "express";
import RestaurantCreationService from "../service/RestaurantCreationService";
import {authenticate,requireRole} from '../../auth/middleware/JwtFilter';
import getRestaurantCreationController from "../controllers/RestaurantCreationController";
import getRestaurantFindByIdController from "../controllers/RestaurantFindByIdController";
import RestaurantFindByIdService from "../service/RestaurantFindByIdService";
import getRestaurantDeletionController from "../controllers/RestaurantDeletionController";
import RestaurantDeletionService from "../service/RestaurantDeletionService";

export default function getRestaurantRouter(restaurantCreationService:RestaurantCreationService,restaurantFindByIdService:RestaurantFindByIdService,restaurantDeletionService:RestaurantDeletionService){
    const router=Router();
    router.post('/',authenticate,requireRole('RESTAURANT_OWNER'),getRestaurantCreationController(restaurantCreationService));
    router.get('/:id',getRestaurantFindByIdController(restaurantFindByIdService));
    router.delete('/:restaurantId', authenticate, requireRole('RESTAURANT_OWNER'), getRestaurantDeletionController(restaurantDeletionService));
    return router;
}