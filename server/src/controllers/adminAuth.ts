import { type Request, type Response } from 'express';
import { PrismaClient, Permission } from '../../generated/prisma/client';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

export const signUpAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

        const existing = await prisma.admin.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ error: 'Admin email already exists' });

        await prisma.admin.create({
            data: {
                email,
                hashedPassword: hashPassword(password),
                isApproved: false,
                permissions: [Permission.VIEW]
            }
        });

        res.status(201).json({ message: 'Sign up successful. Wait for super-admin or authorized admin to approve your request.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during sign up' });
    }
};

export const signInAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

        // Check SUPER_ADMIN
        if (
            process.env.SUPER_ADMIN_EMAIL &&
            process.env.SUPER_ADMIN_PASSWORD &&
            email === process.env.SUPER_ADMIN_EMAIL &&
            password === process.env.SUPER_ADMIN_PASSWORD
        ) {
            const token = jwt.sign(
                { id: 'super-admin', email, role: 'super-admin', permissions: Object.values(Permission) },
                JWT_SECRET,
                { expiresIn: '12h' }
            );
            res.cookie('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            return res.json({ message: 'Super Admin login successful', token });
        }

        // Check normal admin
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

        if (!verifyPassword(password, admin.hashedPassword)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (!admin.isApproved) {
            return res.status(403).json({ error: 'Your access request is pending approval.' });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: 'admin', permissions: admin.permissions },
            JWT_SECRET,
            { expiresIn: '12h' }
        );
        res.cookie('admin_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        
        return res.json({ message: 'Admin login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during sign in' });
    }
};

export const logoutAdmin = (req: Request, res: Response) => {
    res.clearCookie('admin_token');
    res.json({ message: 'Logged out successfully' });
};