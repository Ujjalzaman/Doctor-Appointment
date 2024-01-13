import React from 'react';
import img from '../../images/doc/doc4.jpg';
import './DashboardSidebar.css';
import { Link } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import {
    FaTable,
    FaCalendarDay,
    FaUserInjured,
    FaHourglassStart,
    FaRegStar, FaUserCog, FaBlog,
    FaSignOutAlt,
    FaLock,
    FaHouseUser
} from "react-icons/fa";

const DashboardSidebar = () => {
    const { data, role } = useAuthCheck();

    return (
        <div className="profile-sidebar p-3 rounded">
            <div className="p-2 text-center border-bottom">
                {
                    role === 'doctor' ?
                        <div className="profile-info text-center">
                            <Link to={'/'}><img src={img} alt="" /></Link>
                            <div className='profile-details'>
                                <h5 className='mb-0'>{data?.firstName + " " + data?.lastName}</h5>
                                <div>
                                    <p className="mb-0">{data?.designation}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="profile-info text-center">
                            <Link to={'/'}><img src={img} alt="" /></Link>
                            <div className='profile-details'>
                                <h5 className='mb-0'>{data?.firstName + " " + data?.lastName}</h5>
                                <div className='mt-2'>
                                    <p className=' form-text m-0'>24 Jul 1983, 38 Years</p>
                                    <p className=' form-text m-0'> New Yourk , USA</p>
                                    <p className=' form-text m-0'>{data?.email}</p>
                                </div>
                            </div>
                        </div>
                }

            </div>
            <nav className="dashboard-menu">
                {
                    role === 'patient' ?
                        <ul>
                            <li className="active">
                                <Link to={'/dashboard'}>
                                    <FaTable className="icon" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/favourite'}>
                                    <FaHouseUser className="icon" />
                                    <span>Favourites</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/profile-setting'}>
                                    <FaUserCog className="icon" />
                                    <span>Profile Settings</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/dashboard/change-password'}>
                                    <FaLock className="icon" />
                                    <span>Change Password</span>
                                </Link>
                            </li>
                            <li>
                                <a href="">
                                    <FaSignOutAlt className="icon" />
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li className="active">
                                <Link to={'/dashboard'}>
                                    <FaTable className="icon" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/appointments'}>
                                    <FaCalendarDay className="icon" />
                                    <span>Appointments</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/my-patients'}>
                                    <FaUserInjured className="icon" />
                                    <span>My Patients</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/schedule'}>
                                    <FaCalendarDay className="icon" />
                                    <span>Schedule Timings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/invoices'}>
                                    <FaHourglassStart className="icon" />
                                    <span>Invoices</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/dashboard/reviews'}>
                                    <FaRegStar className="icon" />
                                    <span>Reviews</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/dashboard/profile-setting'}>
                                    <FaUserCog className="icon" />
                                    <span>Profile Settings</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/dashboard/blogs'}>
                                    <FaBlog className="icon" />
                                    <span>Blogs (Will move to Admin)</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/dashboard/change-password'}>
                                    <FaLock className="icon" />
                                    <span>Change Password</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/change-password'}>
                                    <FaSignOutAlt className="icon" />
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                }
            </nav>
        </div>
    )
}
export default DashboardSidebar;