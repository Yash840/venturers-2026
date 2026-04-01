import mongoose, { Schema } from 'mongoose';
import { PassTier } from '../types/enums';

const participantSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true, index: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        institute: { type: String, required: true, trim: true },
        course: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
        passTier: { type: String, enum: Object.values(PassTier), required: true },
        eventsApplied: { type: [String], default: [] },
        billingAmount: { type: Number, required: true },
        isVerified: { type: Boolean, default: false },
        paymentSSLink: { type: String, required: true },
    },
    { id: false, versionKey: false }
);

participantSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const { _id: _drop, ...rest } = ret as Record<string, unknown> & { _id?: unknown };
        return rest;
    },
});

export type ParticipantDoc = mongoose.InferSchemaType<typeof participantSchema>;
export const Participant = mongoose.model('Participant', participantSchema);
