import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Import routers
import authRoutes from '../src/routes/authRoutes';
import syllabusRoutes from './routes/syllabusRoutes';
import mcqRoutes from './routes/mcqRoutes';
import progressRoutes from './routes/progressRoutes';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/mcqs', mcqRoutes);
app.use('/api/progress', progressRoutes);

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', message: 'Backend Server is healthy!' });
});



export default app;
