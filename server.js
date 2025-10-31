// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const users = require('./users');
const { verifyToken, SECRET } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, this is your dashboard.` });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
