import { faCalendar, faCog, faGripHorizontal, faHome, faSignOutAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Sidebar.css';
import Spinner from 'react-bootstrap/Spinner'
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

const Sidebar = () => {
    const {user,loading, erro, dispatch} = useContext(AuthContext);
    const hanldeSignOut = () =>{
        dispatch({type: "LOGOUT"})
    }

    return (
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5">
            <ul className="list-unstyled">
                <li>
                    <Link to="/" className="text-white text-decoration-none">
                        <FontAwesomeIcon icon={faUser} />
                        <span className='text-capitalize'>{user?.username}</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" className="text-white text-decoration-none"><FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </Link>
                </li>

                <li>
                    <Link to="/dashboard" className="text-white text-decoration-none"><FontAwesomeIcon icon={faGripHorizontal} />
                        <span>Dashboard</span>
                    </Link>
                </li>


                {/* {doctor === true && */}

                    <div>
                        <li>
                            <Link to="/appointment" className="text-white text-decoration-none"><FontAwesomeIcon icon={faCalendar} />
                                <span>AppointMent</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/patients" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUser} />
                                <span>Patients</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/doctors" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUserPlus} />
                                <span>Doctors</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/addDoctor" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUserPlus} />
                                <span>Add Doctor</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/review" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUserPlus} />
                                <span>Review</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className="text-white text-decoration-none"><FontAwesomeIcon icon={faCog} />
                                <span>Setting</span>
                            </Link>
                        </li>
                    </div>
                {/* } */}
            </ul>
            <div className="desh-logout">
                <Link to="/" className="text-white text-decoration-none" onClick={hanldeSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} /><span>
                    {loading ? <Spinner animation="border" variant="info" /> : "LogOut"}
                </span></Link>
            </div>
        </div>
    );
};

export default Sidebar;