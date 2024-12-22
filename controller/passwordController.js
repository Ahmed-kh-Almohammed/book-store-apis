const asyncHandler = require("express-async-handler");
const {User}=require("../models/user");
const jwt=require("jsonwebtoken");
const bcrypt =require("bcryptjs");
const nodemailer=require("nodemailer");

/*
@desc GET password
@rout /password/forget-password
@method GET
@access public
*/


module.exports.getForgetPasswordView=asyncHandler((req,res)=>{
      res.render('forgot-password');
});

/*
@desc send forgot  password
@rout /password/forgot-password
@method POST
@access public 
*/

module.exports.sendForgotPasswordLink=asyncHandler(async (req,res)=>{
    const user=await User.findOne({email:req.body.email});
   // console.log(user);
    if(!user){
       return  res.status(404).json({message:"user not found"});
    }
    const secret = process.env.JWT_SECRET_KEY+user.password;
    const token=jwt.sign({email:user.email ,id : user.id},secret,{expiresIn:"30m"});
    const link=`http://localhost:5000/password/reset-password/${user._id}/${token}`;

     const transporter=nodemailer.createTransport({
          service : "gmail",
          auth :{
             user:"your gmail",
             pass:"app password"

          }

}


);

const mailOptions = {
  from :"",
  to :"",
  subject : "",
  html:`<div> 
     <h4> click on the link below </h4> 
     <p>${link } </p> 
  </div> `
}
transporter.sendMail(mailOptions , function(error,success){
   if(error){
     console.log(error);
   }
   else {
         console.log("email sent: "  +success.response)
   }
});
res.render("link-send");
});


/*
@desc get reset  password link
@rout /password/reset-password/:userId/:token
@method GET
@access public 
*/

module.exports.getRestPasswordView=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.params.userId);
    if(!user){
       return  res.status(404).json({message:"user not found"});
    }
    const secret = process.env.JWT_SECRET_KEY+user.password;
    try {
        jwt.verify(req.params.token,secret);
        res.render('reset-password',{email:user.email});
    } catch (error) {
        console.log(error);
        res.json({message:"Erorr..from  getResetPasswordView"});
    }  
});

/*
@desc reset the password
@rout /password/reset-password/:userId/:token
@method post
@access public 
*/

module.exports.resetThePassword=asyncHandler(async (req,res)=>{
    /// to Do validation
    const user=await User.findById(req.params.userId);
    if(!user){
       return  res.status(404).json({message:"user not found"});
    }
    const secret = process.env.JWT_SECRET_KEY+user.password;
    try {
        jwt.verify(req.params.token,secret);
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
        user.password=req.body.password;
        console.log("here ",user);

        await user.save();

        res.render('succsess-password');
       
    } catch (error) {
        console.log(error);
        res.json({message:"Erorr..from  resetthepassword"});
    }  
});