import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // Extract token from headers
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.email || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'Forbidden: Admin access required.' });
    }

    // Attach admin details to the request object if needed
    req.admin = { email: decoded.email };
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export default adminAuth;
