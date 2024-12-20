import express from 'express';
import { fetchJobs, applyForJob } from '../controllers/candidateController.js';

const router = express.Router();

// Route to fetch available job listings
router.get('/jobs', fetchJobs);

// Route to apply for a job
router.post('/jobs/apply', applyForJob);

export default router;
