/** @format */

import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
	userId:string;
      permissions:string[];
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) 
		return res.status(401).json({error: 'Authentication required'});

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			userId: string;
			permissions: string[];
		};
            req.userId=decoded.userId
            req.permissions = decoded.permissions;
		next();
	} catch (err) {
		res.status(401).json({error: 'Invalid token'});
	}
};
