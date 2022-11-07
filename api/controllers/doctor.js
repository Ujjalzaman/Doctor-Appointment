import Doctors from "../models/Doctors.js";
import DoctorAppointMent from "../models/DoctorAppointMent.js";
// import DoctorAppointMenet from '../models/DoctorAppointMenet.js';

export const appointMentByDate = (req, res) => {
    const date = req.body;
    const email = req.body.email;
    console.log(date.date);
    doctorCollection.find({ email: email })
        .toArray((err, doctor) => {
            const filter = { date: date.date }
            if (doctor.length === 0) {
                filter.email = email;
            }
            doctorAppointMentCollection.find(filter)
                .toArray((err, documents) => {
                    res.send(documents);
                })
        })
}


export const AddDoctor = async(req, res) => {
    const file = req.files.file;
    const {name, email} = req.body;
    const docObj = new Doctors(req.body)
    try{
        const savedData = await docObj.save();
        res.status(200).json(savedData)
    }
    catch(err){
        console.log(err)
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

export const DoctorList = async(req, res) => {
    try{
        const doctorList = await Doctors.find()
        res.status(200).json(doctorList)
    }
    catch(err){
        console.log(err)
    }
}

export const AddAppointMentCollection = async(req, res) => {
    const saveAppoint = new DoctorAppointMent(req.body)
    try{
        const addpointment = await saveAppoint.save();
        res.status(200).json(addpointment)
    }
    catch(err){
        console.log(err)
    }
}

export const AllPatientsList = async(req, res) => {
    try{
        const allPatients = await DoctorAppointMent.find();
        res.status(200).json(allPatients);
    }
    catch(err){
        console.log(err)
    }
}

export const IsDoctor = async(req, res) => {
    try{
        const isDoc = await Doctors.findOne({email: req.body.email})
        res.status(200).json(isDoc)
    }
    catch(err){
        console.log(err)
    }
    // const email = req.body.email;
    //     doctorCollection.find({email:email})
    //     .toArray((err, doctor) =>{
    //         res.send(doctor.length > 0);
    //     })
}