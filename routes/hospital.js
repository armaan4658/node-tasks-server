import express from "express";
import {signUp, logIn, 
    hospitalUpdate, otpVerification, 
    passwordResetLink} from '../modules/hospital.js';
export const hospitalRouter = express.Router();

//signup
hospitalRouter.route('/signup')
.post(signUp)

//login
hospitalRouter.route('/login')
.post(logIn)

//hospital details update
hospitalRouter.route(`/update/:id`)
.patch(hospitalUpdate)

//otp verification
hospitalRouter.route('/otp')
.patch(otpVerification);

//password reset link
hospitalRouter.route('/passwordreset/:hospitalEmail')
.get(passwordResetLink);