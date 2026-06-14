import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            uloga?: string;
            id?: string;
            pid?: number;
            grupa?: number;
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        res.sendStatus(401); 
        return; 
    }

    jwt.verify(token, process.env.JWT_SECRET ?? "", (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
            res.sendStatus(403); 
            return; 
        }

        if (typeof decoded === 'object' && decoded !== null) {
            req.uloga = decoded.uloga;
            req.id = decoded.id;
            req.pid = decoded.pid
        }

        next(); 
    });
};