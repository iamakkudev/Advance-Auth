import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    lostlogin:{
        type:Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

},{timestamps:true});

export const User = mongoose.model('User', userSchema);

