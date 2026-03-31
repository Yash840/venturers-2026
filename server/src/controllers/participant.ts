import { PassTier, Prisma, PrismaClient } from '../../generated/prisma/client';
import { type Request, type Response } from 'express';

const prisma = new PrismaClient();

export const registerParticipant = async (req: Request, res: Response) => {
    const { email, firstName, lastName, institute, course, phoneNumber, passTier, eventsApplied, billingAmount, paymentSSLink } = req.body;

    try {
        const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
        const normalizedFirstName = typeof firstName === 'string' ? firstName.trim() : '';
        const normalizedLastName = typeof lastName === 'string' ? lastName.trim() : '';
        const normalizedInstitute = typeof institute === 'string' ? institute.trim() : '';
        const normalizedCourse = typeof course === 'string' ? course.trim() : '';
        const normalizedPhoneNumber = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';

        if (!normalizedEmail || !normalizedFirstName || !normalizedLastName || !normalizedInstitute || !normalizedCourse || !normalizedPhoneNumber) {
            return res.status(400).json({ error: 'Missing required registration fields.' });
        }

        if (passTier !== PassTier.Premium && passTier !== PassTier.Customized) {
            return res.status(400).json({ error: 'Invalid pass tier selected.' });
        }

        const normalizedEventsApplied = Array.isArray(eventsApplied)
            ? eventsApplied.map((entry) => String(entry).trim()).filter(Boolean)
            : typeof eventsApplied === 'string'
                ? eventsApplied.split(',').map((entry) => entry.trim()).filter(Boolean)
                : [];

        if (normalizedEventsApplied.length === 0) {
            return res.status(400).json({ error: 'At least one event must be selected.' });
        }

        const normalizedBillingAmount = Number.parseFloat(String(billingAmount));
        if (!Number.isFinite(normalizedBillingAmount) || normalizedBillingAmount < 0) {
            return res.status(400).json({ error: 'Invalid billing amount.' });
        }

        const normalizedPaymentSSLink = typeof paymentSSLink === 'string' ? paymentSSLink : '';

        const newParticipant = await prisma.participant.create({
            data: {
                email: normalizedEmail,
                firstName: normalizedFirstName,
                lastName: normalizedLastName,
                institute: normalizedInstitute,
                course: normalizedCourse,
                phoneNumber: normalizedPhoneNumber,
                passTier,
                eventsApplied: normalizedEventsApplied,
                billingAmount: normalizedBillingAmount,
                paymentSSLink: normalizedPaymentSSLink,
            },
        });
        return res.status(201).json(newParticipant);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({ error: 'A participant with this email already exists.' });
        }

        if (error instanceof Error) {
            return res.status(500).json({ error: `An error occurred while registering the participant: ${error.message}` });
        } else {
            return res.status(500).json({ error: 'An unknown error occurred while registering the participant.' });
        }
    }
};
