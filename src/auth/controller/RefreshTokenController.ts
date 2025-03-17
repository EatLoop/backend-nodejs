/** @format */

import {Request, Response} from 'express';
import JwtService from '../service/JwtService';

const getRefreshTokenController =
	(jwtService: JwtService) =>
	async (req: Request, res: Response): Promise<void> => {
		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token) {
			res.status(400).json({message: 'Token is required'});
			return;
		}

		try {
			const newToken = jwtService.refreshToken(token);
			res.status(200).json({token: newToken});
		} catch (error) {
			res.status(401).json({message: 'Invalid token'});
		}
	};
export default getRefreshTokenController;
