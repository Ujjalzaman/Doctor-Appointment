import Doctors from "../models/Doctors.js";
import appointMentSchema from "../models/DoctorAppointMent.js";

export const appointMentByDate = async(req, res, next) => {
    try{
        const appointmentDate = await appointMentSchema.find({date: req.body.date})
        res.status(200).json(appointmentDate);
    }catch(err){
        next(err);
    }
}

export const AddDoctor = async(req, res, next) => {
    const docObj = new Doctors(req.body)
    try{
        const savedData = await docObj.save();
        res.status(200).json(savedData)
    }
    catch(err){
        next(err);
    }
    // file.mv(`${__dirname}/doctors/${file.name}`, err => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(500).send({ msg: "Faliled to upload" })
    //     }
    //     doctorCollection.insertOne({ name, email, file })
    //         .then(result => {
    //             return res.send({ name: file.name, path: `/${file.name}` })
    //         })
    // })
}

export const DoctorList = async(req, res, next) => {
    try{
        const doctorList = await Doctors.find()
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
    const doctorEmail = req.body.email;
    try{
        const isDoc = await Doctors.findOne({email:require.body.email})
        res.status(200).json(isDoc)
    }
    catch(err){
        next(err);
    }
}