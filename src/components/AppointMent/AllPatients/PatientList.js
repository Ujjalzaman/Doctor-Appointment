import React from 'react';

const PatientList = ({ patient }) => {
    return (
        <table className="table shadow-lg p-5 mt-4">
            <thead className="thead-dark">
                <tr>
                    <th className="text-primar text-center" scope="col">Sr No</th>
                    <th className="text-primar" scope="col">Email</th>
                    <th className="text-primar" scope="col">Gender</th>
                    <th className="text-primar" scope="col">Name</th>
                    <th className="text-primar" scope="col">Age</th>
                    <th className="text-primar" scope="col">Weight</th>
                    <th className="text-primar" scope="col">Phone</th>
                </tr>

            </thead>
            <tbody>
                {
                    patient && patient.map((patient, index) =>
                        <tr className="pateint-table-data" key={index + 1}>
                            <th className="text-center">{index + 1}</th>
                            <td>{patient.name}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.age}</td>
                            <td>{patient.weight}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.email}</td>
                        </tr>
                    )
                }

            </tbody>
        </table>
    );
};

export default PatientList;