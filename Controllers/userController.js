const generateToken = require("../generateToken");
const UserSchema = require("../Models/UserModel")
const registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, role } = req.body;
  if(!firstName || !lastName || !email || !phoneNumber || !password || !role) {
    res.status(400).json({ message: "Please enter all fields" });
    return;
  }
  const user = await UserSchema.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    role
  });
  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    token: generateToken(user._id)
  });
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please enter email OR password" });
    return;
  }
  const user = await UserSchema.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = { registerUser, authUser}
