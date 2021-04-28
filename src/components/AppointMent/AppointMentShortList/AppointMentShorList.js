import React from 'react';

const AppointMentShorList = ({appointment}) => {
    return (
        <table className="table table-borderless">
            <thead>
                <tr>
                <th className="text-secondary" scope="col">Name</th>
                <th className="text-secondary" scope="col">Phone</th>
                <th className="text-secondary" scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {
                     console.log(appointment)
                }
                {
                   
                  appointment.map((appoint, index) => 
                        
                    <tr>
                        <td>{appoint.name}</td>
                        <td>{appoint.phone}</td>
                        <td>{appoint.email}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default AppointMentShorList;