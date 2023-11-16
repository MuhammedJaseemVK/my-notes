import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authroutes.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json())

app.use('/api/v1/auth',authRoutes);

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})