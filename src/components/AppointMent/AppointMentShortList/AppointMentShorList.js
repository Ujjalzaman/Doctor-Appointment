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
                        <th className="text-secondary" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {/* {appointment.map((appoint, index) => */}

                    <tr>
                        <td>Ujjal Zaman</td>
                        <td>0175842045</td>
                        <td>ujjalzaman@gmail.com</td>
                        <div class="btn-group">
                            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Not Visited</button>
                        </div>
                    </tr>

                    <tr>
                        <td>Ujjal Zaman</td>
                        <td>0175842045</td>
                        <td>ujjalzaman@gmail.com</td>
                        <div class="btn-group">
                            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Not Visited</button>
                        </div>
                    </tr>

                    <tr>
                        <td>Ujjal Zaman</td>
                        <td>0175842045</td>
                        <td>ujjalzaman@gmail.com</td>
                        <div class="btn-group">
                            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Not Visited</button>
                        </div>
                    </tr>


                    {/* ) */}
                    {/* } */}
                </tbody>
            </table>
        </div>
    );
};

export default AppointMentShorList;