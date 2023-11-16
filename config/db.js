import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.DB_STRING}`);
        console.log(`Connected to MongoDB :${conn.connection.host}`.bgCyan.white);
    }
    catch (error) {
        console.error(error)
    }
}

export default connectDB;