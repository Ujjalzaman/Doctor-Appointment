import React from 'react'
import './PatientAppointment';
import img from '../../images/john.png';
const PatientAppointment = () => {
    return (
        <div className="appointment-tab">

            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                <li className="nav-item">
                    <a className="nav-link active" href="" data-toggle="tab">Upcoming</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#today-appointments" data-toggle="tab">Today</a>
                </li>
            </ul>

            <div className="tab-content">

                <div className="tab-pane show active" id="upcoming-appointments">
                    <div className="card card-table mb-0">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                    <thead>
                                        <tr>
                                            <th>Patient Name</th>
                                            <th>Appt Date</th>
                                            <th>Purpose</th>
                                            <th>Type</th>
                                            <th className="text-center">Paid Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a href="" className="avatar avatar-sm mr-2">
                                                        <img className="avatar-img rounded-circle" src={img} alt="User Image" /></a>
                                                    <a href="">Richard Wilson <span>#PT0016</span></a>
                                                </h2>
                                            </td>
                                            <td>11 Nov 2019 <span className="d-block text-info">10.00 AM</span></td>
                                            <td>General</td>
                                            <td>New Patient</td>
                                            <td className="text-center">$150</td>
                                            <td className="text-end">
                                                <div className="table-action">
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
                                                        <i className="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
                                                        <i className="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                                        <i className="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane" id="today-appointments">
                    <div className="card card-table mb-0">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover table-center mb-0">
                                    <thead>
                                        <tr>
                                            <th>Patient Name</th>
                                            <th>Appt Date</th>
                                            <th>Purpose</th>
                                            <th>Type</th>
                                            <th className="text-center">Paid Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a href="patient-profile.html" className="avatar avatar-sm mr-2">
                                                        <img className="avatar-img rounded-circle" src="assets/img/patients/patient6.jpg" alt="User Image" />
                                                    </a>
                                                    <a href="patient-profile.html">Elsie Gilley <span>#PT0006</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span className="d-block text-info">6.00 PM</span></td>
                                            <td>Fever</td>
                                            <td>Old Patient</td>
                                            <td className="text-center">$300</td>
                                            <td className="text-right">
                                                <div className="table-action">
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
                                                        <i className="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
                                                        <i className="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                                        <i className="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a href="patient-profile.html" className="avatar avatar-sm mr-2">
                                                        <img className="avatar-img rounded-circle" src="assets/img/patients/patient7.jpg" alt="User Image" />

                                                    </a>
                                                    <a href="patient-profile.html">Joan Gardner <span>#PT0006</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span className="d-block text-info">5.00 PM</span></td>
                                            <td>General</td>
                                            <td>Old Patient</td>
                                            <td className="text-center">$100</td>
                                            <td className="text-right">
                                                <div className="table-action">
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
                                                        <i className="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
                                                        <i className="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                                        <i className="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a href="patient-profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient8.jpg" alt="User Image" /></a>
                                                    <a href="patient-profile.html">Daniel Griffing <span>#PT0007</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span className="d-block text-info">3.00 PM</span></td>
                                            <td>General</td>
                                            <td>New Patient</td>
                                            <td className="text-center">$75</td>
                                            <td className="text-right">
                                                <div className="table-action">
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
                                                        <i className="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
                                                        <i className="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                                        <i className="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a href="patient-profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient9.jpg" alt="User Image" /></a>
                                                    <a href="patient-profile.html">Walter Roberson <span>#PT0008</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span className="d-block text-info">1.00 PM</span></td>
                                            <td>General</td>
                                            <td>Old Patient</td>
                                            <td className="text-center">$350</td>
                                            <td className="text-right">
                                                <div className="table-action">
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
                                                        <i className="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
                                                        <i className="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                                        <i className="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a href="patient-profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient10.jpg" alt="User Image" /></a>
                                                    <a href="patient-profile.html">Robert Rhodes <span>#PT0010</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span className="d-block text-info">10.00 AM</span></td>
                                            <td>General</td>
                                            <td>New Patient</td>
                                            <td className="text-center">$175</td>
                                            <td className="text-right">
                                                <div className="table-action">
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
                                                        <i className="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
                                                        <i className="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                                        <i className="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 className="table-avatar">
                                                    <a href="patient-profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient11.jpg" alt="User Image" /></a>
                                                    <a href="patient-profile.html">Harry Williams <span>#PT0011</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span className="d-block text-info">11.00 AM</span></td>
                                            <td>General</td>
                                            <td>New Patient</td>
                                            <td className="text-center">$450</td>
                                            <td className="text-right">
                                                <div className="table-action">
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-info-light">
                                                        <i className="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
                                                        <i className="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                                        <i className="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PatientAppointment