import express from 'express';
import { seedSyllabus, getSyllabus } from '../controllers/syllabusController';

const router = express.Router();

// GET /api/syllabus -> Fetches the whole syllabus tree
router.get('/', getSyllabus);

// POST /api/syllabus/seed -> (Admin only) Injects the JSON data
router.post('/seed', seedSyllabus);

export default router;
