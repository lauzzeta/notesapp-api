const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "no token provided",
      });
    }
    jwt.verify(token, process.env.key, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err.message,
        });
      } else {
        req.userEmail = decoded.email;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

module.exports = verifyToken;
