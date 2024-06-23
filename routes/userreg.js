
const express = require("express");
const router = express.Router();
const joi = require("joi");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { User, validateRegisterUser, validateLogInUser } = require("../models/user");
/*
  @desc register new user 
  @rout /api/user/register
  @method POST
  @access Public
*/

router.post("/register", asyncHandler(async (req, res) => {

  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "this user have been registered before" });
  }
  const salt = await bcrypt.genSalt(7);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email

  })
  const result = await user.save();
  const token = user.GeneratToken();
  const  { password, ...other } = result._doc;
  res.status(201).json({ ...other, token });
}));


/*
  @desc log in  user 
  @rout /api/user/login
  @method POST
  @access Public
*/

router.post("/login", asyncHandler(async (req, res) => {

  const { error } = validateLogInUser(req.body);
  if (error) {

    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "this user have not been registered before" });
  }
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token=user.GeneratToken();
  console.log(token);
  const { password, ...other } = user._doc;
  res.status(200).json({ ...other, token });
}));

module.exports = router;