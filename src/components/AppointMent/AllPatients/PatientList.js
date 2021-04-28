import React from 'react';

const PatientList = ({patient}) => {
    return (
        <table className="table shadow p-2">
            <thead className="p-5">
                <tr>
                <th className="text-secondary text-left" scope="col">Sr No</th>
                <th className="text-secondary" scope="col">Name</th>
                <th className="text-secondary" scope="col">Gender</th>
                <th className="text-secondary" scope="col">Age</th>
                <th className="text-secondary" scope="col">Weight</th>
                <th className="text-secondary" scope="col">Phone</th>
                <th className="text-secondary" scope="col">Email</th>
                </tr>

            </thead>
            <tbody>
                {
                    patient.map((patient, index) =>
                    <tr>
                        <td>{index +1}</td>
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