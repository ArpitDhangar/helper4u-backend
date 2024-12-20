import db from '../config/db.js';

// Fetch available job listings
export const fetchJobs = (req, res) => {
  const query = 'SELECT id, title, description, location, salary FROM jobs';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching jobs:', err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json(results);
  });
};

// Apply for a job
export const applyForJob = (req, res) => {
  const { candidate_name, contact, job_id } = req.body;

  // Validate inputs
  if (!candidate_name || !contact || !job_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO applications (job_id, candidate_name, contact) VALUES (?, ?, ?)';
  const values = [job_id, candidate_name, contact];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error applying for job:', err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Application submitted successfully', applicationId: result.insertId });
  });
};
