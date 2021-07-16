import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config" ;
import nodemailer from "nodemailer";
import {Hospital} from '../models/signup.js';
import {Otp} from '../models/otp.js';
//signing up
export const signUp = async(req,res)=>{
    const {hospitalName,hospitalLocation,hospitalEmail,password} = req.body;
    try{
        const hos = await Hospital.findOne({hospitalEmail});
        if(!hos){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            const hospital = new Hospital({
                hospitalName,
                hospitalLocation,
                hospitalEmail,
                password:hashedPassword,
                status:"inactive"
            })
            const otp = Math.floor(1000 + Math.random()*9000);
            const verify = new Otp({
                hospitalEmail,
                otp
            })
            //saving to database
            const hos = await hospital.save();
            //saving otp in db
            await verify.save();
            const sub="Confirmation e-mail";
            const link = await bcrypt.genSalt(4);
            const href=`http://localhost:3000/verifyaccount/${hos._id}`;
            const message = `<b>Your one time password is : ${otp}</b><br/>
            Click the link below to verify your account<br/>
            <a href=${href}>${link} </a>`
            //sending confirmation email
            sendEmail(hospitalEmail,sub,message);
            res.status(200).send({"message":"green"});
        }else{
            res.send({"message":"Account already exist"});
        }
    }catch(e){
        res.status(400).send({error:e});
    }
}


//Logging in
export const logIn = async(req,res)=>{
    const {hospitalEmail,password} = req.body;
    try{
        const hospital = await Hospital.findOne({hospitalEmail});
        if(hospital){
            if(hospital.status=="inactive"){
                res.send({"message":"Your account has not been verified"});
            }
            const inDbPassword = hospital.password;
            const isPassword = await bcrypt.compare(password,inDbPassword);
            if(isPassword){
                const user = {id:hospitalEmail}
                const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
                res.send({"message":"green","token":accessToken,"_id":hospital._id});
            }else{
                res.send({"message":"Unauthorized user"});
            }
        }else{
            res.send({"message":"Invalid credentials"})
        }
    }catch(e){
        res.send({"error":e});
    }
}


//hospitalUpdate
export const hospitalUpdate = async(req,res)=>{
    try{
        const {id} = req.params;
        const {hospitalName,
            hospitalLocation,
            hospitalEmail,
            password,
            status} = req.body;
        const hospital = await Hospital.findById(id);
        if(hospitalName){
            hospital.hospitalName = hospitalName;
        }
        if(hospitalLocation){
            hospital.hospitalLocation = hospitalLocation;
        }
        if(hospitalEmail){
            hospital.hospitalEmail = hospitalEmail;
        }
        if(password){
            hospital.password = password;
        }
        if(status){
            hospital.status = status;
        }
        await hospital.save();
        res.send({"message":"green",...hospital});
    }catch(e){
        res.send({"error":e});
    }
}


//otp check
export const otpVerification = async(req,res) =>{
    const {otp,hospitalEmail} = req.body;
    const verify = await Otp.findOne({hospitalEmail});
    if(otp==verify.otp){
        const hospital = await Hospital.findOne({hospitalEmail});
        hospital.status="active";
        await hospital.save();
        res.send({"message":"green"})
    }else{
        res.send({"message":"OTP entered is incorrect"})
    }
}


//sending email
const sendEmail = async(hospitalEmail,sub,message) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = {
    from: `"Test Maan" <${process.env.EMAIL}>`, // sender address
    to: `${hospitalEmail}`, // list of receivers
    subject: `${sub}`,  // plain text body
    html: `${message} ` // html body
  };
   transporter.sendMail(info,(err,data)=>{
      if(err){
          console.log(err);
      }else{
          console.log(`Email sent to : ${hospitalEmail}`);
      }
  })

}

//sending password reset link
export const passwordResetLink = async(req,res)=>{
    try{
        const {hospitalEmail} = req.params;
        const hos = await Hospital.findOne({hospitalEmail})
        const salt = await bcrypt.genSalt(3);
        const sub ="Password reset";
        const href=`http://localhost:3000/passwordreset/${hos._id}`;
        const message = `<b>Click the link below to reset your password : </b><br/>
        <a href=${href}>${salt} </a>`;
        //sending e-mail
        sendEmail(hos.hospitalEmail,sub,message);
        res.send({"message":"green"});
    }catch(e){
        res.send({"error":e});
    }
}
