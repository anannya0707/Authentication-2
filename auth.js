// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

module.exports = { verifyToken, SECRET };
