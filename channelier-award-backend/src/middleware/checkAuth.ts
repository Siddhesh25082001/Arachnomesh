import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../config/config";
import logger from "../logger";

/**
 * @param role {string | string[]} role requied to access the endpoint
 */
export function checkAuth(role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ msg: 'You are not authenticated' });
        }

        const token = authorization.split(' ')[1];
        if (token === "" || token === undefined) {
            return res.status(401).json({ message: 'You are not authenticated' });
        }
        try {
            const user = jwt.verify(token, config.jwtKey.secret);
            console.log(user);
            
            if (user && user instanceof Object) {
                if (!role.includes(user.role)) {
                    return res.status(401).json({ message: 'unautorize request-1' });
                }
                req.user = {
                    id: user.id,
                    phone: user.phone,
                    role: user.role,
                };
                next();
            } else {
                return res.status(401).json({ message: 'unautorize request-2' });
            }
        } catch (error) {
            logger.error(`CheckAuth: ${error}`);
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}