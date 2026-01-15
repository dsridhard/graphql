const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role}, // ✅ FIXED
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
};

module.exports = { generateToken, verifyToken };