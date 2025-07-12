const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers.js");

router.post("/register", async (req, res) => {
  //This will run the register api
  const { email, password, firstName, lastName, username } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);

  //Generate a token

  const token = await getToken(email, newUser);
  const userToReturn = { ...newUser.toJSON(), token };

  delete userToReturn.password; // for security measure as it will not return to the user
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    // console.log(user.password);
    if (!user) {
      return res.status(403).json({ err: "Invalid Credentials" });
    }
    // console.log("Password from req.body:", password);
    // console.log("Password from DB:", user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(402).json({ err: "Invalid Credentials" });
    }

    const token = await getToken(user.email, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // set to true in production with HTTPS
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(401).json({ error: "Something went wrong" });
  }
});

module.exports = router;
