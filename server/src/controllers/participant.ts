import { type Request, type Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Participant } from '../models/Participant';
import { PassTier } from '../types/enums';
import { getNextSequence } from '../utils/nextSequence';

export const registerParticipant = async (req: Request, res: Response) => {
    // 1. ADD paymentSSLink back into the destructuring from req.body
    const { email, firstName, lastName, institute, phoneNumber, passTier, eventsApplied, billingAmount, paymentSSLink } = req.body;

    try {
        const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
        const normalizedFirstName = typeof firstName === 'string' ? firstName.trim() : '';
        const normalizedLastName = typeof lastName === 'string' ? lastName.trim() : '';
        const normalizedInstitute = typeof institute === 'string' ? institute.trim() : '';
        const normalizedPhoneNumber = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';

        if (!normalizedEmail || !normalizedFirstName || !normalizedLastName || !normalizedInstitute || !normalizedPhoneNumber) {
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

        // 2. NEW CLOUDINARY LOGIC
        // Grab the Cloudinary URL that your `uploadImage` middleware injected into req.body
        let normalizedPaymentSSLink = typeof paymentSSLink === 'string' ? paymentSSLink : '';
        
        // Enforce that paid passes must have a screenshot URL
        if (normalizedBillingAmount > 0 && !normalizedPaymentSSLink) {
            return res.status(400).json({ error: 'Payment screenshot is required for paid passes.' });
        }

        const id = await getNextSequence('Participant');
        const newParticipant = await Participant.create({
            id,
            email: normalizedEmail,
            firstName: normalizedFirstName,
            lastName: normalizedLastName,
            institute: normalizedInstitute,
            phoneNumber: normalizedPhoneNumber,
            passTier,
            eventsApplied: normalizedEventsApplied,
            billingAmount: normalizedBillingAmount,
            paymentSSLink: normalizedPaymentSSLink, // 3. Save the Cloudinary URL to MongoDB
        });
        
        return res.status(201).json(newParticipant);
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
            return res.status(409).json({ error: 'A participant with this email already exists.' });
        }

        if (error instanceof Error) {
            return res.status(500).json({ error: `An error occurred while registering the participant: ${error.message}` });
        } else {
            return res.status(500).json({ error: 'An unknown error occurred while registering the participant.' });
        }
    }
};