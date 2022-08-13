const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const userExist = await User.findOne({ username });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    username,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("Error Ocurred!");
  }

  res.json({
    username,
    password,
  });
});

module.exports = { registerUser };
