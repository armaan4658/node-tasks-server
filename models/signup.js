import mongoose from "mongoose";
const hospitalSchema = new mongoose.Schema({
    hospitalName:{
        type : String,
        required : true
    },
    hospitalLocation:{
        type: String,
        required: true
    },
    hospitalEmail:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});
export const Hospital = mongoose.model("Hospital",hospitalSchema);