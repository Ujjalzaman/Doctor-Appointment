import React from 'react';
import img from '../../images/doc/doc4.jpg';
import './DashboardSidebar.css';
import { Link } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
const DoctorDashboardSidebar = () => {
    const { data, role } = useAuthCheck();
    return (
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                {
                    role === 'doctor' ?
                        <div className="profile-info-widget">
                            <a className="booking-doc-img">
                                <img src={img} alt="User Image" />
                            </a>
                            <div className="profile-det-info">
                                <h3>{data?.firstName + " " + data?.lastName}</h3>

                                <div className="patient-details">
                                    <h5 className="mb-0">BDS, MDS - Oral & Maxillofacial Surgery</h5>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="profile-info-widget">
                            <a className="booking-doc-img">
                                <img src={img} alt="User Image" />
                            </a>
                            <div className="profile-det-info">
                                <h3>{data?.firstName + " " + data?.lastName}</h3>

                                <div className="patient-details">
                                    <p className='p-1 m-0'>24 Jul 1983, 38 Years</p>
                                    <p className='p-1 m-0'> New Yourk , USA</p>
                                    <p className='p-1 m-0'>{data?.email}</p>
                                </div>
                            </div>
                        </div>
                }

            </div>
            <div className="dashboard-widget">
                <nav className="dashboard-menu">
                    {
                        role == 'patient' ?
                            <ul>
                                <li className="active">
                                    <Link to={'/doctor/dashboard'}>
                                        <i className="fas fa-columns"></i>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/doctor/favourite'}>
                                        <i className="fas fa-calendar-check"></i>
                                        <span>Favourites</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/doctor/profile-setting'}>
                                        <i className="fas fa-user-cog"></i>
                                        <span>Profile Settings</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/doctor/change-password'}>
                                        <i className="fas fa-lock"></i>
                                        <span>Change Password</span>
                                    </Link>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                            :
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
                                    <Link to={'/doctor/my-patients'}>
                                        <i className="fas fa-user-injured"></i>
                                        <span>My Patients</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/doctor/schedule'}>
                                        <i className="fas fa-hourglass-start"></i>
                                        <span>Schedule Timings</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/doctor/reviews'}>
                                        <i className="fas fa-star"></i>
                                        <span>Reviews</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/doctor/profile-setting'}>
                                        <i className="fas fa-user-cog"></i>
                                        <span>Profile Settings</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/doctor/change-password'}>
                                        <i className="fas fa-lock"></i>
                                        <span>Change Password</span>
                                    </Link>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                    }
                </nav>
            </div>
        </div>
    )
}

export default DoctorDashboardSidebar