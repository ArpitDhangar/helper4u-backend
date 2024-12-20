import bcrypt from 'bcrypt';
import db from '../config/db.js'
import jwt from 'jsonwebtoken'

// Register User or Admin
export const register = async (req, res) => {
    const { role } = req.body; // role: 'user' or 'admin'
  
    if (!role) {
      return res.status(400).json({ message: 'Role is required (user/admin)' });
    }
  
    try {
      // Handle registration for Admin
      if (role === 'admin') {
        const { companyName, companyEmail, password, location } = req.body;
  
        // Validate required fields for Admin
        if (!companyName || !companyEmail || !password || !location) {
          return res.status(400).json({ message: 'All admin fields are required' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        const query =
          'INSERT INTO users (name, email, password, role, company_name, location) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [companyName, companyEmail, hashedPassword, role, companyName, location];
  
        db.query(query, values, (err, result) => {
          if (err) {
            console.error('Error registering admin:', err.message);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          res.status(201).json({ message: 'Admin registered successfully', userId: result.insertId });
        });
      } 
      
      // Handle registration for User
      else if (role === 'user') {
        const { name, email, password, profession } = req.body;
  
        // Validate required fields for User
        if (!name || !email || !password || !profession) {
          return res.status(400).json({ message: 'All user fields are required' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password, role, profession) VALUES (?, ?, ?, ?, ?)';
        const values = [name, email, hashedPassword, role, profession];
  
        db.query(query, values, (err, result) => {
          if (err) {
            console.error('Error registering user:', err.message);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
      } 
      
      else {
        res.status(400).json({ message: 'Invalid role. Choose user or admin' });
      }
    } catch (err) {
      console.error('Error during registration:', err.message);
      res.status(500).json({ message: 'Error processing request' });
    }
  };

  // Login
export const login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    const query = 'SELECT * FROM users WHERE email = ?';
  
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const user = results[0];
  
      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        role: user.role, // Include the role in the response
      });
    });
  };

  // Logout
export const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
  };