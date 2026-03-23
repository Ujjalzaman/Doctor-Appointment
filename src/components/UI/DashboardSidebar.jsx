import React from 'react';
import img from '../../images/avatar.jpg';
import './DashboardSidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import { loggedOut, getUserInfo } from '../../service/auth.service';
import { useGetDoctorQuery } from '../../redux/api/doctorApi';
import { getDoctorProfileProgress } from '../../utils/doctorProfileCompletion';
import {
    FaTable,
    FaCalendarCheck,
    FaUserInjured,
    FaFileInvoiceDollar,
    FaStar,
    FaUserCog,
    FaBlog,
    FaSignOutAlt,
    FaLock,
    FaHeart,
    FaClock,
    FaFileAlt,
    FaSearch,
    FaPills
} from "react-icons/fa";

const DashboardSidebar = () => {
    const { data, role } = useAuthCheck();
    const navigate = useNavigate();
    const auth = getUserInfo();
    const { data: doctorForStatus } = useGetDoctorQuery(auth?.userId, {
        skip: role !== 'doctor' || !auth?.userId,
    });
    const doctorProfile = role === 'doctor' ? getDoctorProfileProgress(doctorForStatus || data) : null;

    const handleLogout = (e) => {
        e.preventDefault();
        loggedOut();
        navigate('/login', { replace: true });
    };

    const doctorMenuItems = [
        { path: '/dashboard', icon: <FaTable />, label: 'Dashboard', exact: true },
        { path: '/dashboard/appointments', icon: <FaCalendarCheck />, label: 'Appointments' },
        { path: '/dashboard/my-patients', icon: <FaUserInjured />, label: 'My Patients' },
        { path: '/dashboard/prescription', icon: <FaFileAlt />, label: 'Prescriptions' },
        { path: '/dashboard/schedule', icon: <FaClock />, label: 'Schedule Timings' },
        { path: '/dashboard/invoices', icon: <FaFileInvoiceDollar />, label: 'Invoices' },
        { path: '/dashboard/reviews', icon: <FaStar />, label: 'Reviews' },
        { path: '/dashboard/blogs', icon: <FaBlog />, label: 'Blogs' },
    ];

    const patientMenuItems = [
        { path: '/dashboard', icon: <FaTable />, label: 'Dashboard', exact: true },
        { path: '/dashboard/appointments', icon: <FaCalendarCheck />, label: 'My Appointments' },
        { path: '/dashboard/favourite', icon: <FaHeart />, label: 'Favourite Doctors' },
        { path: '/dashboard/invoices', icon: <FaFileInvoiceDollar />, label: 'Invoices & payments' },
        { path: '/dashboard/prescription', icon: <FaPills />, label: 'Prescriptions & medicines' },
        { path: '/track-appointment', icon: <FaSearch />, label: 'Track appointment' },
    ];

    const menuItems = role === 'doctor' ? doctorMenuItems : patientMenuItems;

    return (
        <div className="dashboard-sidebar">
            <div className="dashboard-profile-header">
                <img 
                    src={data?.img || img} 
                    alt={`${data?.firstName} ${data?.lastName}`}
                    className="dashboard-profile-avatar"
                />
                <h5 className="dashboard-profile-name">
                    {role === 'doctor' && 'Dr. '}
                    {data?.firstName} {data?.lastName}
                </h5>
                {role === 'doctor' ? (
                    <div className="dashboard-profile-meta">{data?.designation}</div>
                ) : (
                    <div className="dashboard-profile-meta">{data?.email}</div>
                )}
                <span className="dashboard-profile-role">
                    {role === 'doctor' ? 'Healthcare Provider' : 'Patient'}
                </span>
                {role === 'doctor' && doctorProfile && !doctorProfile.complete && (
                    <span className="badge bg-warning text-dark mt-2 d-inline-block">Profile incomplete — inactive listing</span>
                )}
            </div>

            <nav className="dashboard-nav">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink 
                                to={item.path} 
                                end={item.exact}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                <span className="icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                    
                    <div className="dashboard-nav-divider" />
                    
                    <li>
                        <NavLink to="/dashboard/profile-setting">
                            <span className="icon"><FaUserCog /></span>
                            <span>Profile Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/change-password">
                            <span className="icon"><FaLock /></span>
                            <span>Change Password</span>
                        </NavLink>
                    </li>
                    <li>
                        <button type="button" className="dashboard-nav-logout" onClick={handleLogout}>
                            <span className="icon"><FaSignOutAlt /></span>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DashboardSidebar;
