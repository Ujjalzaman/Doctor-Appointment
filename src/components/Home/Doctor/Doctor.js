import React, { useEffect, useState } from 'react';
import doctorImg from '../../../images/doctor.png';
import DoctorDetail from './DoctorDetail';

// const doctorData = [
//     {
//         name: "doctor sumit",
//         mobile: 4888884548,
//         img: doctorImg
//     },
//     {
//         name: "doctor Asut",
//         mobile: 4888884548,
//         img: doctorImg
//     },
//     {
//         name: "doctor Gush",
//         mobile: 4888884548,
//         img: doctorImg
//     }
// ]
const Doctor = () => {
    const [doctor, setDoctor] = useState([])

    useEffect(() => {
        fetch('https://sleepy-tundra-72379.herokuapp.com/doctors')
        .then(res => res.json())
        .then(data => setDoctor(data))
    },[])
    return (
        <section className="doctors">
            <div className="container">
                <h1 className="brand-color text-center mb-5">Our Doctors </h1>
            </div>
            <div className="row">
                {
                    doctor.map(doctor =><DoctorDetail key={doctor._id} doctor={doctor}></DoctorDetail>)
                }
            </div>
        </section>
    );
};

export default Doctor;