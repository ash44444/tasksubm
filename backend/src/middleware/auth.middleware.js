// src/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token;

    // ✅ Check cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ✅ Check Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
