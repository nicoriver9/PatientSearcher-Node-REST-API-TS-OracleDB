import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createToken = async (user: string) => {        
    // Create a Token
    const token: string = jwt.sign({ id: user}, process.env['TOKEN_SECRET'] || '',
    { 
        expiresIn: process.env.TOKEN_EXPIRED_INTERVAL_SECS + 's' 
    });
    return token;
};
