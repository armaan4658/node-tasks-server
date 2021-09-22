import express from "express";
export const otpRouter = express.Router();
import {getOtp} from '../modules/otp.js';

otpRouter.route('/get').get(getOtp)

otpRouter.route('/delete/:id').delete(deleteOtp)