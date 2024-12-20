import express from 'express';
import { addJob, getAllJobs } from '../controllers/adminController.js';

const router = express.Router();

// Admin routes for job management
router.post('/job', addJob);
router.get('/jobs', getAllJobs);

export default router;
