import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import img from '../../../images/john.png';
import './Appointments.css';

const Appointments = () => {
    return (
        <DashboardLayout>
            {/* <div className="col-md-7 col-lg-8 col-xl-9"> */}
                <div className="appointments">
                    <div className="appointment-list">
                        <div className="profile-info-widget">
                            <a href="#" className="booking-doc-img">
                                <img src={img} alt="User Image" />
                            </a>
                            <div className="profile-det-info">
                                <h3><a href="patient-profile.html">Richard Wilson</a></h3>
                                <div className="patient-details">
                                    <h5><i className="far fa-clock"></i> 14 Nov 2019, 10.00 AM</h5>
                                    <h5><i className="fas fa-map-marker-alt"></i> Newyork, United States</h5>
                                    <h5><i className="fas fa-envelope"></i> richard@example.com</h5>
                                    <h5 className="mb-0"><i className="fas fa-phone"></i> +1 923 782 4575</h5>
                                </div>
                            </div>
                        </div>
                        <div className="appointment-action">
                            <a href="#" className="btn btn-sm bg-info-light" data-toggle="modal" data-target="#appt_details">
                                <i className="far fa-eye"></i> View
                            </a>
                            <a href="javascript:void(0);" className="btn btn-sm bg-success-light">
                                <i className="fas fa-check"></i> Accept
                            </a>
                            <a href="javascript:void(0);" className="btn btn-sm bg-danger-light">
                                <i className="fas fa-times"></i> Cancel
                            </a>
                        </div>
                    </div>
                </div>
            {/* </div> */}



        </DashboardLayout>
    )
}

export default Appointments