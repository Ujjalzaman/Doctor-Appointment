import React from 'react';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';
import PatientList from './PatientList';
import './patient.css';
import DeshActivity from './DeshActivity';
import useFetch from '../../hooks/useFetch';

const AllPatients = () => {
    const {data, loading, error} = useFetch("http://localhost:5000/auth/patients");
    return (
        <div className="all-patient">
            <Sidebar></Sidebar>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 p-5 pr-4 m-0 patient-container">
                        <div className="deshboard-activity">
                            <DeshActivity />
                        </div>
                        <h6 className="brand-color text-start">Recent Appointments</h6>
                        <PatientList patient={data}></PatientList>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPatients;

