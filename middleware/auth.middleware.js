const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  cookieParser()(req, res, () => {});

  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/admin/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

module.exports = { authenticateUser };
