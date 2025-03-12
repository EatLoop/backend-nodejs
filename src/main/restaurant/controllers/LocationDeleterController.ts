
import { Request, Response } from 'express';
import LocationDeleterService from '../service/LocationDeleterService';
import { AuthRequest } from 'auth/middleware/JwtFilter';

export default function getLocationDeleterController(service: LocationDeleterService) {

	return async (req:Request,res:Response): Promise<void> =>{
		try {
			const authRequest=req as AuthRequest
			const userId=authRequest.userId
			const locationId=authRequest.params.id
			await service.deleteLocation(locationId,userId);
		} catch (error) {
			res.status(400).json({error})
		}
	}
}