import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use('/api/users', userRoutes);
app.use('/api/auth/', authRoutes);

app.listen(3000, () => {
  console.log('app running on port 3000')
})