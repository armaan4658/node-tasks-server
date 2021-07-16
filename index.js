import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {hospitalRouter} from './routes/hospital.js';
import {visitRouter} from './routes/visit.js';
import {docRouter} from './routes/doctor.js';
import dotenv from "dotenv/config" ;
const app = express();
const PORT = 5000;
//mongodb url
const url = process.env.MONGO_DB_URL;
//connecting mongodb
mongoose.connect(url,{useNewUrlParser:true});
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));

app.use(express.json());
app.use(cors())

app.use('/hospital',hospitalRouter);
app.use('/visit',visitRouter);
app.use('/doctor',docRouter);

app.get('/',(req,res)=>{
    res.send("Server is working");
})

app.listen(PORT,()=>console.log(`Server started at PORT : ${PORT}`));