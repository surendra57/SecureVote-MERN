const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

// Middleware to verify JWT token
exports.authenticateUser = async(req, res, next) => {
  const { token } = req.cookies;
  // const token = req.headers.authorization
  // console.log(token)

  if (!token) return res.status(401).json({ message: "Authentication failed" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId)
  
    if (user.role !== 'Voter') {
        return res.status(403).json({ message: 'You are not authorized to vote.' });
      }
  
  req.user=user

  next()
};



exports.checkVoter = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your own secret key
      const user = await User.findById(decoded.userId);
      
      if (user.role !== 'Voter' || user.voted) {
        return res.status(403).json({ message: 'You are not authorized to vote.' });
      }
  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }
  }