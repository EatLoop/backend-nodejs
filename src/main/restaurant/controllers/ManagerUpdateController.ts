
import ManagerUpdateService from '../service/ManagerUpdateService';
import UpdateManagerRequestDto from '../dto/UpdateManagerRequestDto';
import { Request, RequestHandler, Response } from 'express';
import { AuthRequest } from 'auth/middleware/JwtFilter';

export default function getManagerUpdateController(service: ManagerUpdateService):RequestHandler {
	return	async(req:Request,res:Response): Promise<void> =>{
		try {
			const authRequest=req as AuthRequest;
			const userId=authRequest.userId
			const requestBody:UpdateManagerRequestDto=req.body
			const updatedLocation=service.updateManager(requestBody,userId)
			res.status(200).json(updatedLocation)
		} catch (error) {
			res.status(400).json({error})
		}
	}
}