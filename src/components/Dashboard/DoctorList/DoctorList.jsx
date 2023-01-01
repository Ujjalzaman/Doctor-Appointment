import React from 'react'
import PatientList from '../../AppointMent/AllPatients/PatientList'
import useFetch from '../../hooks/useFetch';
import Sidebar from '../Sidebar/Sidebar';

const DoctorList = () => {
    const { data, loading, error } = useFetch("http://localhost:5000/auth/doctors");
    return (
        <div className="all-patient">
            <Sidebar></Sidebar>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 p-5 pr-4 m-0 patient-container">
                        <h6 className="brand-color text-start">Doctors</h6>
                        <table className="table shadow-lg p-5 mt-4">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-primar text-center" scope="col">Sr No</th>
                                    <th className="text-primar" scope="col">Name</th>
                                    <th className="text-primar" scope="col">Email</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    data && data.map((item, index) =>
                                        <tr className="pateint-table-data" key={index + 100}>
                                            <th className="text-center">{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorList