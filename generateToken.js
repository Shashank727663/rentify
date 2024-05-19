// jwt helps us to authorize the user in our backend
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "shashank", {
    expiresIn: "30d"
  });
};

module.exports = generateToken;