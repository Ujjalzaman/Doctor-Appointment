import React, { useEffect, useState } from 'react';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';
import PatientList from './PatientList';
const AllPatients = () => {
    const [patient, setPatients] = useState([]);
    useEffect(() => {
        fetch('https://sleepy-tundra-72379.herokuapp.com/allPatients')
            .then(res => res.json())
            .then(data => setPatients(data))
    },[])
    return (
        <div className="row">
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5" style={{position:'absolute', right:'0', backgroundColor:'#F4FDFB'}}>
                <h5 className="brand-color text-center">All Patients</h5>
                <PatientList patient={patient}></PatientList>
            </div>
        </div>
    );
};

export default AllPatients;