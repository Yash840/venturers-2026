import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { type Permission } from '../types/enums';

export interface AuthRequest extends Request {
    user?: {
        id: number | 'super-admin';
        email: string;
        permissions: Permission[];
        role: 'super-admin' | 'admin';
    };
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.admin_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export const requirePermission = (requiredPermission: Permission) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized.' });
        }

        if (req.user.role === 'super-admin') {
            return next();
        }

        if (!req.user.permissions.includes(requiredPermission)) {
            return res.status(403).json({ error: `Forbidden. Requires ${requiredPermission} permission.` });
        }

        next();
    };
};
