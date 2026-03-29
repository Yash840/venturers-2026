import { type Response } from 'express';
import { PrismaClient, Permission } from '../../generated/prisma/client';
import { type AuthRequest } from '../middlewares/auth';

const prisma = new PrismaClient();

// Required Permission: SHARE_ACCESS
export const getPendingRequests = async (req: AuthRequest, res: Response) => {
    try {
        const pendingAdmins = await prisma.admin.findMany({
            where: { isApproved: false },
            select: { id: true, email: true, permissions: true, isApproved: true }
        });
        res.json(pendingAdmins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching requests' });
    }
};

// Required Permission: SHARE_ACCESS
export const grantAccess = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const adminId = parseInt(req.params.id);
        const { permissions } = req.body;

        if (isNaN(adminId)) return res.status(400).json({ error: 'Invalid admin ID' });

        const admin = await prisma.admin.findUnique({ where: { id: adminId } });
        if (!admin) return res.status(404).json({ error: 'Admin not found' });

        const updatedAdmin = await prisma.admin.update({
            where: { id: adminId },
            data: {
                isApproved: true,
                permissions: permissions || admin.permissions
            },
            select: { id: true, email: true, isApproved: true, permissions: true }
        });

        res.json({ message: 'Access granted successfully', admin: updatedAdmin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error granting access' });
    }
};

// Required Permission: VIEW
export const getParticipants = async (req: AuthRequest, res: Response) => {
    try {
        const participants = await prisma.participant.findMany();
        res.json(participants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching participants' });
    }
};

// Required Permission: MODIFY
export const verifyParticipant = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const participantId = parseInt(req.params.id);
        if (isNaN(participantId)) return res.status(400).json({ error: 'Invalid participant ID' });

        const participant = await prisma.participant.findUnique({ where: { id: participantId } });
        if (!participant) return res.status(404).json({ error: 'Participant not found' });

        const updatedParticipant = await prisma.participant.update({
            where: { id: participantId },
            data: { isVerified: !participant.isVerified } // switches the flag
        });

        res.json({ message: 'Participant verification status toggled', participant: updatedParticipant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error verifying participant' });
    }
};