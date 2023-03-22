import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface IPayload {
    _id: string;
    iat: number;
} 

export const TokenValidation = (req: Request, res: Response) => {
    try {
        const token = req.header('token');
        if (!token) return res.status(401).json('Access Denied');
        const payload = jwt.verify(token, process.env['TOKEN_SECRET'] || '') as IPayload;
        return true;
        
    } catch (e) {        
        return false;
    }
}


