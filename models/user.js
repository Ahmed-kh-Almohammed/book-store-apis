const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 100,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        trim: true

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    isAdmin: {
        default: false,
        type: Boolean
    }


}, { timestamps: true });

UserSchema.methods.GeneratToken = function () {

    return jwt.sign({ id: this.id, username: this.username, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY, {
        expiresIn: "100m"
    });

}
function validateRegisterUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        username: joi.string().trim().min(2).max(200).required(),
        password: joi.string().trim().min(6).required(),
    })
    return schema.validate(obj);
}

function validateLogInUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(6).required(),
    })
    return schema.validate(obj);
}
function validateUpdaterUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).email(),
        username: joi.string().trim().min(2).max(200),
        password: joi.string().trim().min(6),

    })
    return schema.validate(obj);
}
const User = mongoose.model("User", UserSchema);
module.exports = { User, validateRegisterUser, validateLogInUser, validateUpdaterUser };