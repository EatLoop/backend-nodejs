import { Router } from "express";
import getLocationCreationController from "../controllers/LocationCreationController";
import getLocationDeleterController from "../controllers/LocationDeleterController";
import getLocationFinderByIdcontroller from "../controllers/LocationFinderByIdController";
import getManagerUpdateController from "../controllers/ManagerUpdateController";
import LocationCreationService from "../service/LocationCreatorService";
import LocationDeleterService from "../service/LocationDeleterService";
import LocationFinderByIdService from "../service/LocationFinderByIdService";
import ManagerUpdateService from "../service/ManagerUpdateService";
import { authenticate, requireRole } from '../../auth/middleware/JwtFilter';

export default function getLocationRouter(locationCreationService:LocationCreationService,
    locationFindByIdService:LocationFinderByIdService,
    managerUpdateService:ManagerUpdateService,
    locationDeleterService:LocationDeleterService){
    const router=Router();
    router.post('/',authenticate,requireRole('RESTAURANT_OWNER'),getLocationCreationController(locationCreationService));
    router.get('/:id',(getLocationFinderByIdcontroller(locationFindByIdService)));
    router.put('/',authenticate,getManagerUpdateController(managerUpdateService))
    router.delete('/:id',getLocationDeleterController(locationDeleterService))
    return router;
}