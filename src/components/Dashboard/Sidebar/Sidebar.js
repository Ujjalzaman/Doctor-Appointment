import { faCalendar, faCog, faFile, faFileAlt, faGripHorizontal, faHome, faSignOutAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Sidebar.css';

const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [doctor, setDoctor] = useState({});

    useEffect(() => {
        fetch("https://sleepy-tundra-72379.herokuapp.com/isDoctor", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setDoctor(data))
    }, [])
    return (
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5">
            <ul className="list-unstyled">

                {loggedInUser.email &&
                    <li>
                        <Link to="/" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUser} />
                            <span>{loggedInUser.name}</span>
                        </Link>
                    </li>
                }
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


                {doctor.length &&
                    <div>
                        <li>
                            <Link to="/get-appointment" className="text-white text-decoration-none"><FontAwesomeIcon icon={faCalendar} />
                                <span>AppointMent</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/allpatient" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUser} />
                                <span>Patients</span>
                            </Link>
                        </li>


                        <li>
                            <Link to="/addDoctor" className="text-white text-decoration-none"><FontAwesomeIcon icon={faUserPlus} />
                                <span>Add Doctor</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="#" className="text-white text-decoration-none"><FontAwesomeIcon icon={faCog} />
                                <span>Setting</span>
                            </Link>
                        </li>
                    </div>
                }
            </ul>
            <div className="desh-logout">
                <Link to="#" className="text-white text-decoration-none"><FontAwesomeIcon icon={faSignOutAlt} /><span>LogOut</span></Link>
            </div>
        </div>
    );
};

export default Sidebar;