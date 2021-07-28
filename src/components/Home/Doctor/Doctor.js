import React, { useEffect, useState } from 'react';
import './Doctor.css';
import DoctorDetail from './DoctorDetail';

const Doctor = () => {
    const [doctor, setDoctor] = useState([])

    useEffect(() => {
        fetch('https://sleepy-tundra-72379.herokuapp.com/doctors')
            .then(res => res.json())
            .then(data => setDoctor(data))
    }, [])
    return (
        <section className="doctors">
            <div className="container">
                <h1 className="brand-color text-center mb-5">Our Doctors </h1>
            </div>
            <div className=" container">
                <div className="row d-flex justify-content-center">
                    {
                        doctor.map(doctor => <DoctorDetail key={doctor._id} doctor={doctor}></DoctorDetail>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Doctor;