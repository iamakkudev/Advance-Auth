import bcryptjs from 'bcryptjs';
import crypto from 'crypto'

import {User} from '../models/user.model.js'

import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../brevo/email.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async(req, res) =>{
   try {
     const {email, password, name} = req.body;

     if(!email || !password || !name){
        throw new Error("All field are required");
     }
     const userAlreadyExist = await User.findOne({email});
     if(userAlreadyExist){
        return res.status(400).json({success:false,message: "User already exist"})
     }
     const salt = await bcryptjs.genSalt(10)
     const hashedpassword = await bcryptjs.hash(password,salt);
     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

     const user = new User({
        email,
        name,
        password: hashedpassword,
        verificationToken,
        verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000, //24 hours
     })

     await user.save();

     //jwt
     generateTokenAndSetCookie(res,user._id);

     await sendVerificationEmail(user.email, verificationToken)

     res.status(201).json({
        success: true,
        message: "User created Successfully",
        user:{
         ...user._doc,
         password:undefined,
        }
     })
    
   } catch (error) {
    res.status(400).json({success:false,message: error.message})
   }
}

export const verifyEmail = async (req,res) =>{
   const {code} = req.body
   try {
      const user = await User.findOne({
         verificationToken: code,
         verificationTokenExpiresAt: {$gt: Date.now() }
      })
      if(!user){
         return res.status(400).json({success:false, message:"Invalid or expired verification code"})
      }

      user.isVerified= true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      await user.save();

      await sendWelcomeEmail(user.email, user.name);

      res.status(200).json({
        success: true,
        message: "Email verified Successfully",
        user:{
         ...user._doc,
         password:undefined,
        }
     })
   } catch (error) {
      console.error("error in verifyEmail", error.message)
      res.status(500).json({success:false,message: "Server Error"})
   }
}

export const login = async(req, res) =>{
    try {
     const {email, password} = req.body;

     if(!email || !password ){
        throw new Error("All field are required");
     }
     const user = await User.findOne({email});
     
     if(!user){
        return res.status(400).json({success:false,message: "Invalid credentials"})
     }
     const isPasswordValid = await bcryptjs.compare(password, user.password);

     if(!isPasswordValid){
        return res.status(400).json({success:false,message: "Invalid credentials"})
     }
     //jwt
     generateTokenAndSetCookie(res,user._id);

     user.lastLogin = new Date();

     res.status(200).json({
        success: true,
        message: "User logged in Successfully",
        user:{
         ...user._doc,
         password:undefined,
        }
     })
    
   } catch (error) {
      console.log("ERror in login",error)
    res.status(400).json({success:false,message: error.message})
   }
}

export const logout = async(req, res) =>{
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logged out Successfully"
     })
}

export const forgotPassword = async(req, res) =>{
const  {email} = req.body;
   try {
      const user = await User.findOne({email});
      
      if(!user){
         return res.status(400).json({success:false,message: "Invalid credentials"})
      }

      //Generate reset token
      user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordExpiresAt = Date.now() + 1 *60 *60 *1000;

      await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}`)

      await user.save()

      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
     })
    
   } catch (error) {
       res.status(400).json({success:false,message: error.message})
   }
}

export const resetPassword = async(req, res) =>{
  
   try {
      const  {resetToken} = req.params;
      const  {password} = req.body;

      const user = await User.findOne({resetPasswordToken:resetToken, resetPasswordExpiresAt: {$gt: Date.now()} });
      
      if(!user){
         return res.status(400).json({success:false,message: "Invalid or expires reset token"})
      }

      //update password
      const hashedpassword = await bcryptjs.hash(password,10)

      user.password = hashedpassword;

      //Generate reset token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;

      await user.save();

      sendResetSuccessEmail(user.email)

      res.status(200).json({
        success: true,
        message: "Password has been reset successfully",
     })
    
   } catch (error) {
      console.error("Error in restPasword", error)
       res.status(400).json({success:false,message: error.message})
   }
}

export const checkAuth = async(req, res) =>{
   try {
      const user = await User.findById(req.userId).select("-password");
      if(!user){
         return res.status(400).json({success:false,message: "User not found"})
      }

      
     res.status(201).json({success: true,user})

   } catch (error) {
      console.error("Error in checkAuth", error)
       res.status(400).json({success:false,message: error.message})
   }
}