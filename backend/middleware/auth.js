import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id; // Attach user ID to req object
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export default authUser;
