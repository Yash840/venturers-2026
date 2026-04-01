import mongoose, { Schema } from 'mongoose';
import { Permission } from '../types/enums';

const adminSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true, index: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        hashedPassword: { type: String, required: true },
        permissions: {
            type: [{ type: String, enum: Object.values(Permission) }],
            default: [Permission.VIEW],
        },
        isApproved: { type: Boolean, default: false },
    },
    { id: false, versionKey: false }
);

adminSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const { _id: _drop, ...rest } = ret as Record<string, unknown> & { _id?: unknown };
        return rest;
    },
});

export type AdminDoc = mongoose.InferSchemaType<typeof adminSchema>;
export const Admin = mongoose.model('Admin', adminSchema);
