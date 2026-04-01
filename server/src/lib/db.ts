import mongoose from 'mongoose';

export async function connectDb(): Promise<void> {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
        throw new Error('MONGODB_URL is not set');
    }
    const dbName = process.env.MONGODB_DB_NAME ?? 'venturers';
    await mongoose.connect(uri, { dbName });
}
