import React from 'react';
import useFetch from '../../hooks/useFetch';
import './Doctor.css';
import DoctorDetail from './DoctorDetail';

const Doctor = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { data, loading, error } = useFetch(`${baseUrl}/auth/doctors`);
    return (
        <section className="doctors" id="doctorContaints">
            <div className="container">
                <h1 className="brand-color text-center mb-5">Our Doctors </h1>
            </div>
            <div className=" container">
                <div className="row d-flex justify-content-center">
                {
                    data && data.map(item => <DoctorDetail key={item._id} item={item}></DoctorDetail>)
                }
                </div>
            </div>
        </section>
    );
};

export default Doctor;