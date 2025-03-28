
import { Request, Response } from 'express';
import LocationCreationService from '../service/LocationCreatorService';
import { AuthRequest } from '../../auth/middleware/JwtFilter';

export default function getLocationCreationController(service:LocationCreationService) {

    return async (req:Request,res:Response): Promise<void> => {
        try {
            const authRequest=req as AuthRequest
            const {userId,body}=authRequest 
            const location=await service.createLocation(userId,body);
            res.status(201).json(location)
        } catch (error) {
            res.status(400).json({error})
        }
    }
}