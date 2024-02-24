import jwt from 'jsonwebtoken';

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (err) {
    console.log(err.message);
    return res.status(403).json({ error: 'Forbidden' });
  }
};

const authorizeRoles = roles => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

export default {
  authenticateToken,
  authorizeRoles
};
