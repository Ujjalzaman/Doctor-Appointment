import React from 'react';
import './AdminSidebar.css';
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>
                        <li className="menu-title">
                            <span>Main</span>
                        </li>
                        <li className="active">
                            <Link to={'/admin/dashboard'}>
                                <FaHome /> <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/appointments'}>
                                <FaListUl /> <span>Appointments</span>
                            </Link>


                        </li>
                        <li>
                            <Link to={'/admin/specialites'}>
                                <FaPeopleArrows /> <span>Specialities</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/doctors'}>
                                <FaUserAstronaut /> <span>Doctors</span>
                            </Link>

                        </li>
                        <li>
                            <Link to={'/admin/patients'}>
                                <FaRegUser /> <span>Patients</span>
                            </Link>

                        </li>
                        <li>
                            <Link to={'/admin/reviews'}>
                                <FaRegStar /> <span>Reviews</span>
                            </Link>

                        </li>
                        <li>
                            <Link to={'/admin/transaction'}>
                                <FaBriefcase /><span>Transactions</span>
                            </Link>

                        </li>

                        <li className="submenu">
                            <a href="#"><i className="fe fe-document"></i> <span> Reports</span> <span className="menu-arrow"></span></a>
                            <ul style={{ display: "none" }}>
                                <li><a >Invoice Reports</a></li>
                            </ul>
                        </li>
                        <li className="menu-title">
                            <span>Pages</span>
                        </li>
                        <li className='text-white'>
                            <Link to={'/admin/profile'}>
                                <FaRegUser /> <span>Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar