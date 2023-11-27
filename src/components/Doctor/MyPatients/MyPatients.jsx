import React from 'react';
import './MyPatients.css';
import img from '../../../images/john.png';
import DashboardLayout from '../DashboardLayout/DashboardLayout';

const MyPatients = () => {
    return (
        <DashboardLayout>
            <div class="row row-grid">
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="card widget-profile pat-widget-profile">
                        <div class="card-body">
                            <div class="pro-widget-content">
                                <div class="profile-info-widget">
                                    <a href="" class="booking-doc-img">
                                        <img src={img} alt="User Image"/>
                                    </a>
                                    <div class="profile-det-info">
                                        <h3><a href="">Richard Wilson</a></h3>

                                        <div class="patient-details">
                                            <h5><b>Patient ID :</b> P0016</h5>
                                            <h5 class="mb-0"><i class="fas fa-map-marker-alt"></i> Alabama, USA</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="patient-info">
                                <ul>
                                    <li>Phone <span>+1 952 001 8563</span></li>
                                    <li>Age <span>38 Years, Male</span></li>
                                    <li>Blood Group <span>AB+</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default MyPatients