import brevo from '@getbrevo/brevo';
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"
import {emailApi,sender} from "./brevo.config.js"

export const sendVerificationEmail = async(email, verificationToken) =>{
    try {

        const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:"User" }]
        emailData.subject = "Verify your email";
        emailData.htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        
        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending verification email `,error?.response?.body || error)
        throw new Error(`Error sending verification email ${error}`)
    }
 }

 export const sendWelcomeEmail = async(email, username) =>{
    try{
        const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:"User" }]
        emailData.subject = "Welcome Email";
        emailData.templateId = 1;
        emailData.params = {
                name: username,
                company_name: "Career Cursor"
            }

        
        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending verification email ${error}`)
        throw new Error(`Error sending verification email ${error}`)
    }
 }

 export const sendPasswordResetEmail = async (email, resetURL) =>{
    try {
        const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:"User" }]
        emailData.subject = "Reset your password";
        emailData.htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)

        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending password reset email ${error}`)
        throw new Error(`Error sending password reset email ${error}`)
    }
 }

 export const sendResetSuccessEmail = async (email) =>{
    try {
       const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:"User" }]
        emailData.subject = "New password created";
        emailData.htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE


        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending reset success email ${error}`)
        throw new Error(`Error sending reset success email ${error}`)
    }
 }