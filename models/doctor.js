import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
    doctorName:{
        type: String,
        required: true
    },
    qualification:{
        type:String,
        required:true
    },
    speciality:{
        type: String,
        required:true
    },
    hospitalId:{
        type: String,
        required: true
    }
})
export const Doctor = mongoose.model("Doctor",doctorSchema);