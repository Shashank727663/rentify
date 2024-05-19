const jwt = require("jsonwebtoken");
const User = require('../Models/UserModel');
const Protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    const decoded = jwt.verify(token, "shashank");
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = Protect;