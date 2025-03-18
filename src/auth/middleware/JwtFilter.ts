/** @format */

import {NextFunction, Request, RequestHandler, Response} from 'express';
import jwt from 'jsonwebtoken';
import Role from '../model/Role';

export interface AuthRequest extends Request {
	userId: string;
	roles: Role[];
}

export const authenticate = ((req: AuthRequest, res: Response, next: NextFunction): void => {
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		res.status(401).json({error: 'Authentication required'});
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'secret') as {
			userId: string;
			roles: Role[];
		};
		console.log(decoded);
		req.userId = decoded.userId;
		req.roles = decoded.roles;
		next();
	} catch (err) {
		res.status(401).json({error: 'Invalid token'});
	}
}) as RequestHandler;

export const requireRole = (role_name: string) => {
	return ((req: AuthRequest, res: Response, next: NextFunction) => {
		if (req.roles.filter(role=>role.name==role_name).length==0) {
			res.status(403).json({error: 'Permission denied'});
			return;
		}
		next();
	}) as RequestHandler;
};
