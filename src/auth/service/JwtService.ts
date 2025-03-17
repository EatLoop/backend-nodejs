/** @format */

import jwt from 'jsonwebtoken';
import Role from '../model/Role';

export default class JwtService {
	generateToken({userId, roles}: {userId: string; roles: Role[]}): string {
		const data = {userId, roles};

		const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

		const token = jwt.sign(data, JWT_SECRET, {
			expiresIn: '1h',
		});
		return token;
	}

	refreshToken(token: string): string {
		const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';
		try {
			const payload = jwt.verify(token, JWT_SECRET) as {userId: string; roles: Role[]};
			const newToken = jwt.sign({userId: payload.userId, roles: payload.roles}, JWT_SECRET, {
				expiresIn: '1h',
			});
			return newToken;
		} catch (error) {
			throw new Error('Invalid token');
		}
	}
}
