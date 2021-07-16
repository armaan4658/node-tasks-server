import mongoose from "mongoose";
const visitScheme = new mongoose.Schema({
    patientName:{
        type: String,
        required: true
    },
    doctorName:{
        type: String,
        required: true
    },
    visitCause:{
        type: String,
        required: true
    },
    visitTime:{
        type: String,
        required: true
    },
    hospitalId:{
        type: String,
        required: true
    }
});
export const Visit = mongoose.model("Visit",visitScheme);