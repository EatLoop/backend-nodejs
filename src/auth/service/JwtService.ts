import Role from 'auth/model/Role';
import jwt from 'jsonwebtoken'

export default class JwtService{
      generateToken({userId,roles}:{userId:string,roles:Role[]}):string{
            const data = {userId,roles};
            
            const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

            const token = jwt.sign(data, JWT_SECRET, {
                  expiresIn: '1h',
            });
            return token
      }
}