import {auth} from '../middleware/auth.js';
import {addDoctor , getDoctor, updatingDoc, deletingDoc} from '../modules/doc.js';
import express from "express";
export const docRouter = express.Router();

//adding doctor
docRouter.route('/add/:hospitalId')
.post(auth,addDoctor)

//getting doctor
docRouter.route('/get/:hospitalId')
.get(auth,getDoctor)

//updating doc
docRouter.route('/update/:id')
.patch(auth,updatingDoc)

//deleting doctor
docRouter.route('/delete/:id')
.delete(auth,deletingDoc)