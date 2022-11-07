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


export const AddDoctor = (req, res) => {
    const file = req.files.file;
    const name = req.body.name;
    const email = req.body.email
    console.log(file, name, email);
    file.mv(`${__dirname}/doctors/${file.name}`, err => {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Faliled to upload" })
        }
        doctorCollection.insertOne({ name, email, file })
            .then(result => {
                return res.send({ name: file.name, path: `/${file.name}` })
            })
    })
}

export const DoctorList = (req, res) => {
    doctorCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
}

export const AddAppointMentCollection = (req, res) => {
    const AppointMent = req.body;
    doctorAppointMentCollection.insertOne(AppointMent)
        .then(result => {
            res.send(result.insertedCount > 0);
        })
}

export const AllPatientsList = (req, res) => {
    doctorAppointMentCollection.find({})
    .toArray((err, documents) => {
        res.send(documents);
    })
}

export const IsDoctor = (req, res) => {
    const email = req.body.email;
        doctorCollection.find({email:email})
        .toArray((err, doctor) =>{
            res.send(doctor.length > 0);
        })
}