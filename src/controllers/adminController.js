import db from '../config/db.js';

export const addJob = (req, res) => {
  const { title, description, location, salary, contact_email } = req.body;
  
  const query = 'INSERT INTO jobs (title, description, location, salary, contact_email) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description, location, salary, contact_email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add job' });
    }
    res.status(201).json({ message: 'Job added successfully', jobId: result.insertId });
  });
};

export const getAllJobs = (req, res) => {
  const query = 'SELECT * FROM jobs';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch jobs' });
    }
    res.status(200).json(result);
  });
};
