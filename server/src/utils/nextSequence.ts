import { Counter } from '../models/Counter';

export async function getNextSequence(counterName: string): Promise<number> {
    const updated = await Counter.findOneAndUpdate(
        { _id: counterName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    ).exec();
    if (!updated) {
        throw new Error(`Failed to allocate sequence for ${counterName}`);
    }
    return updated.seq;
}
