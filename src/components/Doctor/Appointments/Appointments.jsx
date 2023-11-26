import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import img from '../../../images/john.png';
import './Appointments.css';

const Appointments = () => {
    return (
        <DashboardLayout>
            {/* <div class="col-md-7 col-lg-8 col-xl-9"> */}
                <div class="appointments">
                    <div class="appointment-list">
                        <div class="profile-info-widget">
                            <a href="#" class="booking-doc-img">
                                <img src={img} alt="User Image" />
                            </a>
                            <div class="profile-det-info">
                                <h3><a href="patient-profile.html">Richard Wilson</a></h3>
                                <div class="patient-details">
                                    <h5><i class="far fa-clock"></i> 14 Nov 2019, 10.00 AM</h5>
                                    <h5><i class="fas fa-map-marker-alt"></i> Newyork, United States</h5>
                                    <h5><i class="fas fa-envelope"></i> richard@example.com</h5>
                                    <h5 class="mb-0"><i class="fas fa-phone"></i> +1 923 782 4575</h5>
                                </div>
                            </div>
                        </div>
                        <div class="appointment-action">
                            <a href="#" class="btn btn-sm bg-info-light" data-toggle="modal" data-target="#appt_details">
                                <i class="far fa-eye"></i> View
                            </a>
                            <a href="javascript:void(0);" class="btn btn-sm bg-success-light">
                                <i class="fas fa-check"></i> Accept
                            </a>
                            <a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
                                <i class="fas fa-times"></i> Cancel
                            </a>
                        </div>
                    </div>
                </div>
            {/* </div> */}



        </DashboardLayout>
    )
}

export default Appointments