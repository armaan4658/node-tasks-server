import {Visit} from '../models/visit.js';
//adding visit
export const addVisit = async(req,res)=>{
    try{
        const {patientName,doctorName,visitCause} = req.body;
        const {hospitalId} = req.params;
        const visitTime = getTime();
        const visit = new Visit({
            patientName,
            doctorName,
            visitCause,
            visitTime,
            hospitalId
        })
        await visit.save();
        res.send(visit);
    }catch(e){
        res.send({"error":e});
    }
}

//getting visit
export const getVisit = async(req,res)=>{
    try{
        const {hospitalId} = req.params;
        const visits = await Visit.find({hospitalId});
        res.send(visits);
    }catch(e){
        res.send({"error":e});
    }
}

//getting current time
const getTime = () =>{
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth()+1;
    let year = currentDate.getFullYear();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let cd=`${day}-${month}-${year}-${hour}:${minutes}:${seconds}`;
    return cd;
}