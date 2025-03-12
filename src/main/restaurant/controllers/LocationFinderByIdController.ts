
import { Request, RequestHandler, Response } from 'express';
import LocationFinderByIdService from '../service/LocationFinderByIdService';

export default function getLocationFinderByIdcontroller(service: LocationFinderByIdService):RequestHandler {

	return async(req:Request,res:Response): Promise<void> =>{
		try {
			const id=req.params.id
			const location=await service.findLocationById(id)
			if(location){
				res.status(200).json(location)
				return
			}
			res.status(400).json({error:"no location found with id "+id})
		} catch (error) {
			res.status(400).json({error})
		}
	}
}