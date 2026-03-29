import express from 'express';
import { getPendingRequests, grantAccess, getParticipants, verifyParticipant } from '../controllers/adminPanel';
import { requireAuth, requirePermission } from '../middlewares/auth';
import { Permission } from '../../generated/prisma/client';

const router = express.Router();

// All panel routes require authentication
router.use(requireAuth);

// Participant management routes
router.get('/participants', requirePermission(Permission.VIEW), getParticipants);
router.patch('/participants/:id/verify', requirePermission(Permission.MODIFY), verifyParticipant);

// Admin access management routes
router.get('/pending-requests', requirePermission(Permission.SHARE_ACCESS), getPendingRequests);
router.post('/grant-access/:id', requirePermission(Permission.SHARE_ACCESS), grantAccess);

export default router;