import React from 'react'
import './PatientAppointment';
import img from '../../images/john.png';
const PatientAppointment = () => {
    return (
        <div class="appointment-tab">

            <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                <li class="nav-item">
                    <a class="nav-link active" href="" data-toggle="tab">Upcoming</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#today-appointments" data-toggle="tab">Today</a>
                </li>
            </ul>

            <div class="tab-content">

                <div class="tab-pane show active" id="upcoming-appointments">
                    <div class="card card-table mb-0">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover table-center mb-0">
                                    <thead>
                                        <tr>
                                            <th>Patient Name</th>
                                            <th>Appt Date</th>
                                            <th>Purpose</th>
                                            <th>Type</th>
                                            <th class="text-center">Paid Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h2 class="table-avatar">
                                                    <a href="" class="avatar avatar-sm mr-2">
                                                        <img class="avatar-img rounded-circle" src={img} alt="User Image" /></a>
                                                    <a href="">Richard Wilson <span>#PT0016</span></a>
                                                </h2>
                                            </td>
                                            <td>11 Nov 2019 <span class="d-block text-info">10.00 AM</span></td>
                                            <td>General</td>
                                            <td>New Patient</td>
                                            <td class="text-center">$150</td>
                                            <td class="text-end">
                                                <div class="table-action">
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-info-light">
                                                        <i class="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                                        <i class="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
                                                        <i class="fas fa-times"></i> Cancel
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
                <div class="tab-pane" id="today-appointments">
                    <div class="card card-table mb-0">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover table-center mb-0">
                                    <thead>
                                        <tr>
                                            <th>Patient Name</th>
                                            <th>Appt Date</th>
                                            <th>Purpose</th>
                                            <th>Type</th>
                                            <th class="text-center">Paid Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h2 class="table-avatar">
                                                    <a href="patient-profile.html" class="avatar avatar-sm mr-2">
                                                        <img class="avatar-img rounded-circle" src="assets/img/patients/patient6.jpg" alt="User Image" />
                                                    </a>
                                                    <a href="patient-profile.html">Elsie Gilley <span>#PT0006</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span class="d-block text-info">6.00 PM</span></td>
                                            <td>Fever</td>
                                            <td>Old Patient</td>
                                            <td class="text-center">$300</td>
                                            <td class="text-right">
                                                <div class="table-action">
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-info-light">
                                                        <i class="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                                        <i class="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
                                                        <i class="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 class="table-avatar">
                                                    <a href="patient-profile.html" class="avatar avatar-sm mr-2">
                                                        <img class="avatar-img rounded-circle" src="assets/img/patients/patient7.jpg" alt="User Image" />

                                                    </a>
                                                    <a href="patient-profile.html">Joan Gardner <span>#PT0006</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span class="d-block text-info">5.00 PM</span></td>
                                            <td>General</td>
                                            <td>Old Patient</td>
                                            <td class="text-center">$100</td>
                                            <td class="text-right">
                                                <div class="table-action">
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-info-light">
                                                        <i class="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                                        <i class="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
                                                        <i class="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 class="table-avatar">
                                                    <a href="patient-profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="assets/img/patients/patient8.jpg" alt="User Image" /></a>
                                                    <a href="patient-profile.html">Daniel Griffing <span>#PT0007</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span class="d-block text-info">3.00 PM</span></td>
                                            <td>General</td>
                                            <td>New Patient</td>
                                            <td class="text-center">$75</td>
                                            <td class="text-right">
                                                <div class="table-action">
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-info-light">
                                                        <i class="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                                        <i class="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
                                                        <i class="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 class="table-avatar">
                                                    <a href="patient-profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="assets/img/patients/patient9.jpg" alt="User Image" /></a>
                                                    <a href="patient-profile.html">Walter Roberson <span>#PT0008</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span class="d-block text-info">1.00 PM</span></td>
                                            <td>General</td>
                                            <td>Old Patient</td>
                                            <td class="text-center">$350</td>
                                            <td class="text-right">
                                                <div class="table-action">
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-info-light">
                                                        <i class="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                                        <i class="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
                                                        <i class="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 class="table-avatar">
                                                    <a href="patient-profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="assets/img/patients/patient10.jpg" alt="User Image" /></a>
                                                    <a href="patient-profile.html">Robert Rhodes <span>#PT0010</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span class="d-block text-info">10.00 AM</span></td>
                                            <td>General</td>
                                            <td>New Patient</td>
                                            <td class="text-center">$175</td>
                                            <td class="text-right">
                                                <div class="table-action">
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-info-light">
                                                        <i class="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                                        <i class="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
                                                        <i class="fas fa-times"></i> Cancel
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 class="table-avatar">
                                                    <a href="patient-profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="assets/img/patients/patient11.jpg" alt="User Image" /></a>
                                                    <a href="patient-profile.html">Harry Williams <span>#PT0011</span></a>
                                                </h2>
                                            </td>
                                            <td>14 Nov 2019 <span class="d-block text-info">11.00 AM</span></td>
                                            <td>General</td>
                                            <td>New Patient</td>
                                            <td class="text-center">$450</td>
                                            <td class="text-right">
                                                <div class="table-action">
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-info-light">
                                                        <i class="far fa-eye"></i> View
                                                    </a>

                                                    <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                                        <i class="fas fa-check"></i> Accept
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
                                                        <i class="fas fa-times"></i> Cancel
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