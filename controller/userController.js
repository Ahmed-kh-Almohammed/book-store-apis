const joi = require("joi");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, validateRegisterUser, validateLogInUser, validateUpdaterUser } = require("../models/user");


/*
  @desc update user 
  @rout /api/user/id
  @method put
  @access private
*/


const updateUser=asyncHandler(async (req, res) => {

    const { error } = validateUpdaterUser(req.body);
    if (error) {
       return res.status(400).json({ mesage: "any" + error.details[0].message });
    }
    // console.log(req.headers);
    if (req.body.password) {
       const salt = await bcrypt.genSalt(7);
       req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
       $set: {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
       }
    }, { new: true }).select("-password");
    res.status(200).json(updatedUser);
 });

 /*
@desc GET ALL user 
@rout /api/users
@method GET
@access private(only Admin)
*/
const getAllUsers=asyncHandler(async (req, res) => {

    const users = await User.find().select("-password");
    res.status(200).json(users);
 });


 /*
@desc GET User By Id
@rout /api/users/id
@method GET
@access private(only Admin && user himself)
*/

const getUserById=asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password");
    if (user)
       res.status(200).json(user);
    else res.status(404).json("no user exist");
 });


 /*
@desc DELETE User By Id
@rout /api/users/id
@method DELETE
@access private(only Admin && user himself)
*/

const deleteUser=asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password");
    if (user) {
       await User.findByIdAndDelete(req.params.id);
       res.status(200).json("user have been deleted");
    }
    else res.status(404).json("no user exist");
 })
 module.exports={updateUser,getAllUsers,getUserById,deleteUser};