const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const port = 5000;
const app = express();
const fileUpload = require('express-fileupload');


app.use(bodyParser.json());
app.use(cors());
app.use(express.static('doctors'));
app.use(fileUpload());


//mongo connection//

const uri = "mongodb+srv://organicUser:RJOc223KT616G33M@cluster0.htf6k.mongodb.net/onlineDoctor?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const doctorCollection = client.db("onlineDoctor").collection("doctors");
    const doctorAppointMentCollection = client.db("onlineDoctor").collection("doctorAppointMenet");

    //appointByDate
    app.post('/appointByDate', (req, res) => {
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
    })
    //   add Doctor
    app.post('/addDoctor', (req, res) => {
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

    })




    //doctor list
    app.get('/doctors', (req, res) => {
        doctorCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //AddAppointMent
    app.post('/addAppointMent', (req, res) => {
        const AppointMent = req.body;
        doctorAppointMentCollection.insertOne(AppointMent)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    //all Appointented Patients
    app.get('/allPatients', (req, res) => {
        doctorAppointMentCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    //if Admin or not
    app.post('/isDoctor', (req, res) =>{
        const email = req.body.email;
        doctorCollection.find({email:email})
        .toArray((err, doctor) =>{
            res.send(doctor.length > 0);
        })
    })








});

//end mongo connection//

app.get('/', (req, res) => {
    res.send("hello it/s running")
})
app.listen(process.env.PORT || port)