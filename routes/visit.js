import {auth} from '../middleware/auth.js';
import {addVisit, getVisit} from '../modules/visit.js';
import express from "express";
export const visitRouter = express.Router();

//adding visit
visitRouter.route('/add/:hospitalId')
.post(auth,addVisit)

//getting visit
visitRouter.route('/get/:hospitalId')
.get(auth,getVisit)