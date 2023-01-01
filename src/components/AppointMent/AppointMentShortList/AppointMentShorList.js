import React from 'react';

const AppointMentShorList = ({ appointment }) => {
    return (
        <div className="container">
            <table className="table table-borderless">
                <thead className="text-center">
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
                <tbody className="text-center">
                    {appointment && appointment?.map((item, index) =>
                    <tr key={index+200}>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.serviceTitle}</td>
                        <td>{item.appointmantDate}</td>
                        <td>{item.weight}</td>
                        <div class="btn-group">
                            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Not Visited</button>
                        </div>
                    </tr>



                    )} 
                </tbody>
            </table>
        </div>
    );
};

export default AppointMentShorList;