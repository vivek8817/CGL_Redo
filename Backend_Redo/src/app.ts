import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Import routers
import authRoutes from '../src/routes/authRoutes';
import syllabusRoutes from './routes/syllabusRoutes';
import mcqRoutes from './routes/mcqRoutes';
import progressRoutes from './routes/progressRoutes';
import connectDb from '../config/db';

// Load env vars
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Vite default local port
  'http://localhost:3000', // React default local port
  process.env.FRONTEND_URL || 'https://your-app.vercel.app' // Placeholder for Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || 
        allowedOrigins.indexOf(origin) !== -1 || 
        origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Ensure DB connection for Serverless environments (like Vercel)
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    next(error);
  }
});


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
