import {Doctor} from '../models/doctor.js';
//adding doc
export const addDoctor = async(req,res)=>{
    try{
        const {doctorName,qualification,speciality} = req.body;
        const {hospitalId} = req.params;
        const doc = new Doctor({
            doctorName,
            qualification,
            speciality,
            hospitalId
        })
        await doc.save();
        res.send(doc);
    }catch(e){
        res.send({"error":e});
    }
}

//getting doc
export const getDoctor = async(req,res)=>{
    try{
        const {hospitalId} = req.params;
        const docs = await Doctor.find({hospitalId});
        res.send(docs); 
    }catch(e){
        res.send({"error":e});
    }
}

//updating doc
export const updatingDoc = async(req,res)=>{
    try{
        const {id} = req.params;
        const {doctorName,qualification,speciality} = req.body;
        const doc = await Doctor.findById(id)
        if(doctorName){
            doc.doctorName = doctorName;
        }
        if(qualification){
            doc.qualification=qualification;
        }
        if(speciality){
            doc.speciality=speciality;
        }
        await doc.save();
        res.send(doc);

    }catch(e){
        res.send({"error":e});
    }
}

//deleting doc
export const deletingDoc = async(req,res)=>{
    try{
        const {id} = req.params;
        const doc = await Doctor.findByIdAndDelete(id);
        res.send(doc);
    }catch(e){
        res.send({"error":e});
    }
}