import {Otp} from '../models/otp.js';

export const getOtp = async(req,res) => {
    try{
        const otp = await Otp.find();
        res.send(otp);
    }catch(e){
        res.status(402).send(e);
    }
}

export const deleteOtp = async(req,res) => {
    try{
        const {id} = req.params;
        const otp = await Otp.findByIdAndDelete(id,(err,data)=>{
            if(err){
                res.status(400).send(err);
            }else{
                res.send({"message":"green"});
            }
        })
    }catch(e){
        res.status(402).send(e);
    }
}