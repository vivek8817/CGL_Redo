import express from 'express';
import { seedMcqs, getMcqsByChapter } from '../controllers/mcqController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/mcqs/:chapterId -> Fetches all questions for a chapter
router.get('/:chapterId', protect, getMcqsByChapter);

// POST /api/mcqs/seed/:chapterId -> (Admin only) Injects a batch of MCQs
router.post('/seed/:chapterId', seedMcqs);

export default router;
