import { AuthRequest } from '../../auth/middleware/JwtFilter';
import { Request, RequestHandler, Response } from 'express';
import RestaurantDeletionService from '../service/RestaurantDeletionService';

export default function getRestaurantDeletionController(service: RestaurantDeletionService): RequestHandler {
    return async (req: Request, res: Response): Promise<void> => {
		try{
        	const authReq = req as AuthRequest;
            const restaurantId = authReq.params.restaurantId;
            if(!authReq?.userId){
				res.status(401).json({message:'Insufficient Permissions'})
				return
			}
            const userId = authReq.userId;
            if (!restaurantId) {
                res.status(400).json({ message: 'Missing restaurant ID' });
                return;
            }
            const response = await service.deleteRestaurant(restaurantId, userId);
            if (response) {
                res.status(410).json({ message: 'Successful deletion' });
            } else {
                res.status(400).json({ message: 'Something went wrong with the user or deletion request' });
            }
        } catch (error: any) {
            console.error('Error during restaurant deletion:', error);
            res.status(500).json({ message: error?.message || 'Internal server error' });
        }
    };
}