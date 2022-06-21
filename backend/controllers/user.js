const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password } = req.body;

  const userObject = {
    username,
    password,
  };
  const user = await User.create(userObject);

  res.status(201).json(user);
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "No username" });
  }
  if (!password) {
    return res.status(400).json({ message: "No password" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "No valid credentials" });
  }
  if (password === user.password) {
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET);
    return res.json({ user, token });
  }

  return res.status(401).json({ message: "No valid credentials" });
};

module.exports = { login, register };
