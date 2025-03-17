/** @format */

import {Request, Response, NextFunction, RequestHandler} from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
	userId:string;
    permissions:string[];
}

export const authenticate = ((req: AuthRequest, res: Response, next: NextFunction):void => {
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		res.status(401).json({error: 'Authentication required'});
		return;
	}

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
}) as RequestHandler;

export const requireRole = (role: string) => {
	return ((req: AuthRequest, res: Response, next: NextFunction) => {
		if (!req.permissions.includes(role)) {
			res.status(403).json({error: 'Permission denied'});
			return;
		}
		next();
	}) as RequestHandler;
}
