const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Provide token" });
  }

  const token = authorizationHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.id,
      usernmame: payload.username,
    };
    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication invalid" });
  }
};

module.exports = authMiddleware;
