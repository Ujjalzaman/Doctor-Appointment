import React from 'react';
import img from '../../images/doc/doc4.jpg';
import './DashboardSidebar.css';
import { Link } from 'react-router-dom';
const DoctorDashboardSidebar = () => {
    return (
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <a href="#" className="booking-doc-img">
                        <img src={img} alt="User Image" />
                    </a>
                    <div className="profile-det-info">
                        <h3>Dr. Darren Elder</h3>

                        <div className="patient-details">
                            <h5 className="mb-0">BDS, MDS - Oral & Maxillofacial Surgery</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget">
                <nav className="dashboard-menu">
                    <ul>
                        <li className="active">
                            <Link to={'/doctor/dashboard'}>
                                <i className="fas fa-columns"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/doctor/appointments'}>
                                <i className="fas fa-calendar-check"></i>
                                <span>Appointments</span>
                            </Link>

                        </li>
                        <li>
                            <a href="my-patients.html">
                                <i className="fas fa-user-injured"></i>
                                <span>My Patients</span>
                            </a>
                        </li>
                        <li>
                            <a href="schedule-timings.html">
                                <i className="fas fa-hourglass-start"></i>
                                <span>Schedule Timings</span>
                            </a>
                        </li>
                        <li>
                            <a href="invoices.html">
                                <i className="fas fa-file-invoice"></i>
                                <span>Invoices</span>
                            </a>
                        </li>
                        <li>
                            <a href="reviews.html">
                                <i className="fas fa-star"></i>
                                <span>Reviews</span>
                            </a>
                        </li>
                        <li>
                            <a href="chat-doctor.html">
                                <i className="fas fa-comments"></i>
                                <span>Message</span>
                                <small className="unread-msg">23</small>
                            </a>
                        </li>
                        <li>
                            <a href="doctor-profile-settings.html">
                                <i className="fas fa-user-cog"></i>
                                <span>Profile Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="social-media.html">
                                <i className="fas fa-share-alt"></i>
                                <span>Social Media</span>
                            </a>
                        </li>
                        <li>
                            <a href="doctor-change-password.html">
                                <i className="fas fa-lock"></i>
                                <span>Change Password</span>
                            </a>
                        </li>
                        <li>
                            <a href="index-2.html">
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default DoctorDashboardSidebar