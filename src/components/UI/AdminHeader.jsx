import React from 'react'
import logo from '../../images/logo.png';
import userImg from '../../images/avatar.jpg';
import './AdminHeader.css';

const AdminHeader = () => {
    return (
        <div className="header">
            <div className="header-left">
                <a href="index.html" className="logo">
                    <img src={logo} alt="Logo" />
                </a>
            </div>

            <a id="toggle_btn">
                <i className="fe fe-text-align-left"></i>
            </a>

            <div className="top-nav-search">
                <form>
                    <input type="text" className="form-control" placeholder="Search here" />
                    <button className="btn" type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>

            <a className="mobile_btn" id="mobile_btn">
                <i className="fa fa-bars"></i>
            </a>
            <ul className="nav user-menu">

                <li className="nav-item dropdown noti-dropdown">
                    <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                        <i className="fe fe-bell"></i> <span className="badge badge-pill">3</span>
                    </a>
                    <div className="dropdown-menu notifications">
                    </div>
                </li>
                <li className="nav-item dropdown has-arrow">
                    <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                        <span className="user-img"><img className="rounded-circle" src={userImg} width="31" alt="Ryan Taylor" /></span>
                    </a>
                    <div className="dropdown-menu">
                        <div className="user-header">
                            <div className="avatar avatar-sm">
                                <img src={userImg} alt="" className="avatar-img rounded-circle" />
                            </div>
                            <div className="user-text">
                                <h6>Ryan Taylor</h6>
                                <p className="text-muted mb-0">Administrator</p>
                            </div>
                        </div>
                        <a className="dropdown-item" href="profile.html">My Profile</a>
                        <a className="dropdown-item" href="settings.html">Settings</a>
                        <a className="dropdown-item" href="login.html">Logout</a>
                    </div>
                </li>

            </ul>

        </div>
    )
}

export default AdminHeader