import React from 'react';
import Table from 'react-bootstrap/Table';
const AppointMentShorList = ({ appointment }) => {
    return (
        <div className='card shadow'>
            <Table striped responsive>
            <thead>
                <tr>
                    <th className="text-secondary" scope="col">Name</th>
                    <th className="text-secondary" scope="col">Phone</th>
                    <th className="text-secondary" scope="col">Email</th>
                    <th className="text-secondary" scope="col">Gender</th>
                    <th className="text-secondary" scope="col">Service</th>
                    <th className="text-secondary" scope="col">Date</th>
                    <th className="text-secondary" scope="col">Weight</th>
                    <th className="text-secondary" scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {appointment && appointment?.map((item, index) =>
                    <tr key={index + 200}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.serviceTitle}</td>
                        <td>{item.appointmantDate}</td>
                        <td>{item.weight}</td>
                        <td className="btn-group">
                            <button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Not Visited</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
    );
};

export default AppointMentShorList;