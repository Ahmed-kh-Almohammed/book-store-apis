const express =require("express");
const router=express.Router();
const {getForgetPasswordView,sendForgotPasswordLink,getRestPasswordView,resetThePassword}=require("../controller/passwordController")

router.route("/forgot-password").get(getForgetPasswordView)
                    .post(sendForgotPasswordLink);
                

router.route("/reset-password/:userId/:token")
.get(getRestPasswordView)
.post(resetThePassword);

module.exports=router;