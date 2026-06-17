import express from 'express';
import { toggleBookmark, getDashboard, submitQuiz } from '../controllers/progressController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Notice we put 'protect' in the middle! They MUST have a token to hit these.
router.post('/bookmark', protect, toggleBookmark);
router.post('/submit', protect, submitQuiz);
router.get('/dashboard', protect, getDashboard);

export default router;
