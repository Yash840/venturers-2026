import { PrismaClient } from '../../generated/prisma/client';
import { type Request, type Response } from 'express';

const prisma = new PrismaClient();

export const registerParticipant = async (req: Request, res: Response) => {
    const { email, firstName, lastName, institute, course, phoneNumber, passTier, eventsApplied, paymentSSLink } = req.body;

    try {
        const newParticipant = await prisma.participant.create({
            data: {
                email,
                firstName,
                lastName,
                institute,
                course,
                phoneNumber,
                passTier,
                eventsApplied: typeof eventsApplied === 'string' ? eventsApplied.split(',') : eventsApplied,
                billingAmount: 0, // Holding on billing amount logic as requested
                paymentSSLink,
            },
        });
        res.status(201).json(newParticipant);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `An error occurred while registering the participant: ${error.message}` });
        } else {
            res.status(500).json({ error: 'An unknown error occurred while registering the participant.' });
        }
    }
};
