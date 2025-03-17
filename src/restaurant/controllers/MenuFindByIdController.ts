import { Request, Response } from 'express';
import MenuFindByIdService from '../service/MenuFindByIdService';

export default function getMenuFindByIdController(service: MenuFindByIdService) {

	return async(req:Request,res:Response): Promise<void> =>{
		try {
			const menuId=req.params.id
			const menu=await service.findById(menuId)
		if(!menu)
			throw new Error('no menu recieved from db')
		res.json(menu)
		} catch (error) {
			res.status(400).json({error})
		}
	}
}