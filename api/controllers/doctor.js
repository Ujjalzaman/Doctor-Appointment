import Doctors from "../models/Doctors.js";
import appointMentSchema from "../models/DoctorAppointMent.js";
import Users from "../models/Users.js";
import { createError } from "../utils/error.js";

export const appointMentByDate = async(req, res, next) => {
    try{
        const appointmentDate = await appointMentSchema.find({date: req.body.date})
        res.status(200).json(appointmentDate);
    }catch(err){
        next(err);
    }
}

export const DoctorList = async(req, res, next) => {
    try{
        const doctorList = await Users.find({isDoctor:true})
        res.status(200).json(doctorList)
    }
    catch(err){
        next(err);
    }
}

export const AddAppointMentCollection = async(req, res, next) => {
    const saveAppoint = new appointMentSchema(req.body)
    try{
        const addpointment = await saveAppoint.save();
        res.status(200).json(addpointment)
    }
    catch(err){
        next(err);
    }
}

//Appopintment PatientList
export const AppointmentPatientsList = async(req, res, next) => {
    try{
        const appointmentPatients = await appointMentSchema.find({});
        res.status(200).json(appointmentPatients);
    }
    catch(err){
        next(err);
    }
}

export const IsDoctor = async(req, res, next) => {
    const docEmail = req.body.email;
    try{
        const isDoc = await Users.findOne({email:docEmail})
        if(isDoc.isDoctor=true){
            const {password, ...others} = isDoc._doc;
            res.status(200).json({...others})
        }
        else{
            res.status(200).json(false)
        }
    }
    catch(err){
        next(err);
    }
}