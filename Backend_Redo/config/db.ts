import mongoose from 'mongoose';

let connectionPromise: Promise<typeof mongoose> | null = null;

const connectDb = async (): Promise<void> => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI not defined');
        }

        connectionPromise ??= mongoose.connect(process.env.MONGO_URI);
        await connectionPromise;
        console.log('MongoDB Connect hogaya hai');
        
    } catch (error: any ) {
        connectionPromise = null;
        console.error(`Error: ${error.message}`);
        throw error;
    }
}



export default connectDb;
