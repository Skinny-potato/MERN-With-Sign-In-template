// db/mongoose.js
import mongoose from 'mongoose';
import config from '../config/config.js'; // Use actual config here

export async function connectToDatabase() {
    try {
        const sentinelConnectionUri = config.DBURI; 
        await mongoose.connect(sentinelConnectionUri);

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to the database');
        });

        mongoose.connection.on('error', (error) => {
            console.error('Mongoose connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose disconnected from the database');
        });

        console.log('Database has been connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}
